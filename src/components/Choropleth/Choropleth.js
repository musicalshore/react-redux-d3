import 'rc-slider/assets/index.css'

import './style.scss'

import {MAPS, MAX_ZOOM_STEP, MIN_ZOOM_STEP, CITY_ZOOM_STEP, DEFAULT_YEAR} from 'constants/maps'
import * as d3 from 'd3'
import _ from 'lodash/fp'
import {array, func, number, object, string} from 'prop-types'
import Slider from 'rc-slider'
import React from 'react'
import * as topojson from 'topojson-client'
import {trackCustom_scLV} from 'utils/sitecatalyst' // eslint-disable-line camelcase

import topodata from './us.json'

const projection = d3.geoAlbersUsa()
const path = d3.geoPath().projection(projection)
const feature = topojson.feature(topodata, topodata.objects.states)
const mesh = topojson.mesh(topodata, topodata.objects.states, (a, b) => a !== b)
const zoom = d3.zoom()
const scales = [0.8, 1.6, 3.2, 6.4]
// const bounds = path.bounds(feature)
// const center = path.centroid(feature)

const Marker = (selectedMap, selectedYear, location) => {
  // point must be specified as a two-element array [longitude, latitude] in degrees
  const point = projection(location.lngLat)
  const centroid = path.centroid({ 'type': 'Point', 'coordinates': location.lngLat })
  const className = `marker ${_.kebabCase(selectedMap)}`
  const rankingType = _.get('rankingType', _.find(['id', selectedMap], MAPS))
  const rank = _.get(`rankings.${rankingType}`, location)

  let additionalClasses = ''
  if (location.newLocation && selectedYear === DEFAULT_YEAR) {
    additionalClasses = 'new-location'
  }
  if (location.mostImproved && selectedYear === DEFAULT_YEAR) {
    additionalClasses = 'most-improved'
  }

  const marker = _.extend({
    className: `${className} ${additionalClasses}`,
    cx: point[0],
    cy: point[1],
    point,
    centroid,
    rank,
    // r: location.seriesValue === 'topTen' ? 16 : 5
    r: rank <= 10 ? 16 : 5
  }, location)
  return marker
}

const Choropleth = class Choropleth extends React.Component {
  static propTypes = {
    onCitySelect: func.isRequired,
    selectedCity: string,
    selectedYear: string.isRequired,
    selectedUSAState: object,
    locations: array,
    selectedMap: string.isRequired,
    width: number.isRequired,
    height: number.isRequired,
    onZoom: func.isRequired,
    zoomStep: number.isRequired
  }

  static defaultProps = {
    width: 715,
    height: 625
  }
  constructor (props) {
    super(props)
    projection
      .scale(1000)
      .translate([props.width / 2, props.height / 2])
    zoom.extent([[0, 0], [props.width / 2, props.height / 2]])
    zoom.on('zoom', this.zoomed)
      .filter(() => {
        if (d3.event.type === 'mousedown') {
          return this.props.zoomStep !== MIN_ZOOM_STEP
        }
        return !d3.event.button
      })
  }

  containerRef = (el) => {
    this.container = el
  }

  onSliderChange = (step) => {
    this.props.onZoom(step)
  }

  handleMarkerClick = (d) => {
    trackCustom_scLV(`${d.state}:${d.city}`)
    // const location = _.find(['cityState', d.cityState], this.props.locations)
    this.props.onCitySelect(d.cityState)
  }

  hideTooltip = () => {
    this.tooltip.style('display', 'none')
  }

  nextStep = () => {
    if (this.props.zoomStep < MAX_ZOOM_STEP) {
      this.props.onZoom(this.props.zoomStep + 1)
    }
  }

  previousStep = () => {
    if (this.props.zoomStep > MIN_ZOOM_STEP) {
      this.props.onZoom(this.props.zoomStep - 1)
    }
  }

  reset = () => {
    this.svg
      .transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity)
  }

  showTooltip = (d) => {
    const {pageX, pageY} = d3.event
    this.tooltip
      .style('left', `${pageX + 18}px`)
      .style('top', `${pageY - 20}px`)
      .style('height', '1em')
      .style('display', 'block')
      .text(d.cityState)
  }

  stopped = () => {
    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }

  updateMarkers = (selectedMap, selectedYear, locations) => {
    this.gMarkers.selectAll('g').remove()
    if (_.isEmpty(locations)) {
      return
    }
    const rankingType = _.get('rankingType', _.find(['id', selectedMap], MAPS))
    const sortedLocations = _.flow([
      _.filter(`rankings.${rankingType}`),
      _.sortBy(`rankings.${rankingType}`),
      _.reverse
    ])(locations)

    const markers = _.map(_.partial(Marker, [selectedMap, selectedYear]), sortedLocations)

    const g = this.gMarkers
      .selectAll('g')
      .data(markers, (d) => _.join('_', d.lngLat))
    g.enter()
      .append('g')
      .on('click', this.handleMarkerClick)
      .on('mouseover', this.showTooltip)
      .on('mouseout', this.hideTooltip)
      .attr('transform', (d) => {
        let point = projection(d.lngLat)
        return `translate(${point[0]}, ${point[1]})`
      })
      .attr('data-index', (d) => d.index)
      .attr('class', (d) => d.className)
      .append('circle')
      .attr('r', (d) => d.r)
      .select(function (d) { return this.parentNode })
      .filter((d) => d.r === 16)
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .text(d => d.rank)
      .classed('rank', true)
  }

  zoomed = () => {
    // const point = { 'type': 'Point', 'coordinates': [0, 0] }
    // const centroid = path.centroid(point)
    // console.log('0,0', centroid, point)
    const {k, x, y} = d3.event.transform
    // console.log('zoomed k x y', k, x, y, d3.zoomIdentity)
    this.gMain.attr('transform', d3.event.transform)
    this.gFeatures.style('stroke-width', `${1 / k}px`)
    this.gMarkers
      .selectAll('circle')
      .attr('r', (d) => d.r / k)
      .style('stroke-width', `${1 / k}px`)
    this.gMarkers
      .selectAll('text')
      // .style('font-size', (d) => `${0.688 / k}em`)
      .style('font-size', (d) => `${11 / k}px`)
      .attr('x', 0)
      .attr('y', 0)
  }

  zoomToCity = (cityState, locations = this.props.locations) => {
    const { width, height, selectedMap, selectedYear } = this.props
    const scale = scales[CITY_ZOOM_STEP - 1]

    const marker = Marker(selectedMap, selectedYear, _.find(['cityState', cityState], locations))
    const translateX = width / 2 - scale * marker.centroid[0]
    const translateY = height / 2 - scale * marker.centroid[1]

    this.svg
      .transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))
    // onZoom(CITY_ZOOM_STEP)
  }

  zoomToStep = (zoomStep) => {
    if (zoomStep === MIN_ZOOM_STEP) {
      this.svg
        .transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity)
    } else {
      this.svg
        .transition()
        .duration(750)
        .call(zoom.scaleTo, scales[zoomStep - 1])
    }
  }

  componentDidMount () {
    const { width, height, locations, selectedMap, selectedYear } = this.props

    // zoom = zoom.extent([[0, 0], [width, height]])
    this.tooltip = d3.select('body')
      .append('div')
      .classed('marker-tooltip', true)
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .classed('svg-map-content', true)
    // this.rect = this.svg.append('rect')
    // this.rect
    //   .attr('width', '100%')
    //   .attr('height', '100%')
    //   .classed('svg-map-background', true)
      // .on('click', this.reset)
    this.gMain = this.svg.append('g').classed('main-group', true)
    this.gFeatures = this.gMain.append('g')

    this.gFeatures
      .selectAll('path')
      .data(feature.features)
      .enter().append('path')
      .attr('d', path)
      .classed('svg-map-feature', true)
    this.gFeatures
      .append('path')
      .datum(mesh)
      .attr('d', path)
      .classed('svg-map-mesh', true)
    this.svg.call(zoom)
      .on('wheel.zoom', null)

    this.gMarkers = this.gMain.append('g').classed('markers', true)
    this.updateMarkers(selectedMap, selectedYear, locations)
  }

  componentWillReceiveProps (nextProps) {
    let { selectedMap, selectedYear, selectedUSAState, zoomStep, selectedCity } = this.props

    if ((selectedMap !== nextProps.selectedMap) ||
        (selectedYear !== nextProps.selectedYear) ||
        (_.get('id', selectedUSAState) !== _.get('selectedUSAState.id', nextProps))) {
      // if map changed or state filter applied, update markers
      if (!_.get('selectedUSAState.id', nextProps)) {
        // if no state filter, zoom out
        this.reset()
      } else {
        // zoom in to the state
        if (nextProps.locations.length) {
          const cityState = _.get('cityState', _.head(nextProps.locations))
          this.zoomToCity(cityState, nextProps.locations)
        }
        // this.props.onZoom(CITY_ZOOM_STEP)
      }
      this.updateMarkers(nextProps.selectedMap, nextProps.selectedYear, nextProps.locations)
    } else if (nextProps.selectedCity && nextProps.selectedCity !== selectedCity) {
      // if selected city has changed, zoom to it
      this.zoomToCity(nextProps.selectedCity)
    } else if (zoomStep !== nextProps.zoomStep) {
      // if zoom step has changed, zoom to step
      this.zoomToStep(nextProps.zoomStep)
    }
  }

  render () {
    let {width, height, zoomStep} = this.props
    const svgMapContainerStyle = {
      paddingBottom: `${100 * (height / width)}%`
    }
    const handleStyle = {
      backgroundColor: '#0096d6',
      width: '15px',
      height: '15px',
      borderRadius: '300px',
      overflow: 'visible',
      marginLeft: '-5px',
      zIndex: '30',
      border: 'none'
    }

    const markStyle = {
      width: '15px',
      height: '3px',
      position: 'absolute',
      marginBottom: '3px',
      background: '#ccc'
    }
    const marks = {
      '1': { style: markStyle },
      '2': { style: markStyle },
      '3': { style: markStyle },
      '4': { style: markStyle }
    }
    // const currentIndex = _.indexOf(this.state.scale, this.scales)
    // const currentValue = currentIndex + 1

    // console.log('rerendering', this.props.zoomStep, currentIndex, currentValue, scales, scales[currentIndex])

    return (
      <div styleName="container">
        <div style={svgMapContainerStyle} className="svg-map-container" ref={this.containerRef} />
        <div className="marker-tooltip" />
        <div styleName="zoom-bar-wrapper">
          <div styleName="zoom-in" onClick={this.nextStep}>+</div>
          <Slider className="zoom-bar"
            vertical={true}
            min={MIN_ZOOM_STEP}
            max={MAX_ZOOM_STEP}
            defaultValue={MIN_ZOOM_STEP}
            value={zoomStep}
            handleStyle={handleStyle}
            onChange={this.onSliderChange}
            marks={marks}
            step={null}
          />
          {<div styleName="zoom-out" onClick={this.previousStep}>-</div>}
        </div>
      </div>
    )
  }
}

export default Choropleth
