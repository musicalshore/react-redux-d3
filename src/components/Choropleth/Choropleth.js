/* eslint-disable no-return-assign */
import './style.scss'
import 'rc-slider/assets/index.css'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import {func, object, number} from 'prop-types'
import React from 'react'
import Slider from 'rc-slider'
import {TOP_CITY} from 'constants/maps'
import _ from 'lodash/fp'
import topodata from './us.json'

class MapError extends Error {
  constructor (message) {
    super(message)
    this.name = 'MapError'
  }
}

const projection = d3.geoAlbersUsa()
const path = d3.geoPath().projection(projection)
const zoom = d3.zoom().scaleExtent([1, 8])

const Marker = (location) => {
  // point must be specified as a two-element array [longitude, latitude] in degrees
  const lngLat = _.reverse(location.latLng)
  const point = projection(lngLat)
  let className = `marker ${_.kebabCase(location.id)}`
  if (location.id === TOP_CITY) {
    if (location.newLocation) {
      className += ' new-location'
    }
    if (location.mostImproved) {
      className += ' most-improved'
    }
  }
  const marker = _.extend({
    lngLat,
    className,
    cx: point[0],
    cy: point[1],
    point: point,
    r: location.seriesValue === 'topTen' ? 16 : 5
  }, location)
  return marker
}

const Choropleth = class Choropleth extends React.Component {
  state = {
    scale: 1
  }

  static propTypes = {
    onCitySelect: func.isRequired,
    selectedCity: object,
    selectedMap: object.isRequired,
    width: number,
    height: number,
    zoomToCityScale: number
  }

  static defaultProps = {
    width: 715,
    height: 625,
    zoomToCityScale: 4
  }

  constructor (props) {
    super(props)
    projection
      .scale(1000)
      .translate([props.width / 2, props.height / 2])
    zoom.on('zoom', this.zoomed)
    this.scales = [1, 2, 4, 8]
  }

  containerRef = (el) => {
    this.container = el
  }

  onSliderChange = (step) => {
    console.log('onSliderChange ', step)
    this.setState({scale: this.scales[step]})
  }

  handleMarkerClick = (datum) => {
    this.props.onCitySelect(_.omit(['cx', 'cy', 'r', 'class'], datum))
  }

  hideTooltip = () => {
    this.tooltip.style('display', 'none')
  }

  nextStep = () => {
    const nextStep = _.indexOf(this.state.scale, this.scales) + 1
    console.log('nextStep ', nextStep)

    if (nextStep < this.scales.length) {
      this.setState({scale: this.scales[nextStep]})
    }
  }

  previousStep = () => {
    const previousStep = _.indexOf(this.state.scale, this.scales) - 1
    if (previousStep >= 0) {
      this.setState({scale: this.scales[previousStep]})
    }
  }

  reset = () => {
    console.log('reset')
    this.svg.transition()
      .duration(750)
      .call(zoom.translateBy, d3.zoomIdentity)
  }

  showTooltip = (d) => {
    let {pageX, pageY} = d3.event
    this.tooltip
      .style('left', `${pageX + 18}px`)
      .style('top', `${pageY - 20}px`)
      .style('height', '1em')
      .style('display', 'block')
      .text(d.cityState)
  }

  stopped = () => {
    console.log('stopped', arguments)
    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }

  updateMarkers = (locations) => {
    this.gMarkers.selectAll('g').remove()
    const markers = _.map(Marker, locations)
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
        .filter((d) => d.seriesValue === 'topTen')
          .append('text')
            .attr('x', 0)
            .attr('y', 3)
            .style('font-size', '0.688em')
            .text(d => d.rank)
            .classed('rank', true)
  }

  zoomed = () => {
    let {k, x, y} = d3.event.transform
    this.gMain.attr('transform', `translate(${x}, ${y})scale(${k})`)
    this.gFeatures.style('stroke-width', `${1 / k}px`)
    this.gMarkers
      .selectAll('circle')
      .attr('r', (d) => d.r / k)
      .style('stroke-width', `${1 / k}px`)
    this.gMarkers
      .selectAll('text')
      .style('font-size', (d) => `${0.688 / k}em`)
      .attr('y', 1)
  }

  zoomToCity = (location) => {
    let { width, height, zoomToCityScale } = this.props
    const marker = Marker(location)
    const point = { 'type': 'Point', 'coordinates': marker.lngLat }
    const centroid = path.centroid(point)
    const translateX = width / 2 - zoomToCityScale * centroid[0]
    const translateY = height / 2 - zoomToCityScale * centroid[1]
    this.svg
      .transition()
      .duration(750)
      // .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomToCityScale))
      .call(zoom.translateBy, translateX, translateY)
      .call(zoom.scaleTo, zoomToCityScale)
  }

  zoomToScale = (scale) => {
    d3.select('svg')
      .transition()
      .duration(750)
      .call(zoom.scaleTo, scale)
  }

  componentDidMount () {
    let { width, height } = this.props
    const locations = _.get('selectedMap.mapData.locations', this.props)
    if (!locations) {
      throw new MapError(`No locations to add after mount.`)
    }
    this.tooltip = d3.select('body')
      .append('div')
      .classed('marker-tooltip', true)
    this.svg = d3.select(this.container)
      .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .classed('svg-map-content', true)
    this.rect = this.svg.append('rect')
    this.rect
      .attr('width', '100%')
      .attr('height', '100%')
      .classed('svg-map-background', true)
      // .on('click', this.reset)
    this.gMain = this.svg.append('g').classed('main-group', true)
    this.gFeatures = this.gMain.append('g')
    this.gFeatures
      .selectAll('path')
        .data(topojson.feature(topodata, topodata.objects.states).features)
        .enter().append('path')
        .attr('d', path)
        .classed('svg-map-feature', true)
        // .on('click', this.reset)
    this.gFeatures
      .append('path')
        .datum(topojson.mesh(topodata, topodata.objects.states, (a, b) => a !== b))
        .attr('d', path)
        .classed('svg-map-mesh', true)
        // .on('click', this.reset)
    this.svg.call(zoom)
      .on('mousedown.zoom', null)
      .on('wheel.zoom', null)
    this.gMarkers = this.gMain.append('g').classed('markers', true)
    this.updateMarkers(locations)
  }

  componentWillReceiveProps (nextProps) {
    let { selectedCity } = this.props
    if (nextProps.selectedCity && nextProps.selectedCity !== selectedCity) {
      this.setState({scale: this.props.zoomToCityScale})
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    let { selectedMap } = this.props
    const locations = _.get('selectedMap.mapData.locations', nextProps)

    // if map changed or state filter applied, update markers
    if ((selectedMap.id !== nextProps.selectedMap.id) ||
        (selectedMap.year !== nextProps.selectedMap.year) ||
        (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      if (!locations) {
        throw new MapError(`No locations to add after update.`)
      }
      this.updateMarkers(locations)
    }
    // if marker clicked, zoom to city
    if (nextProps.selectedCity) {
      console.log('--this.state', this.state, nextState)
      this.zoomToCity(nextProps.selectedCity)
      return true
    }
    // if (nextProps.selectedMap.stateFilter &&
    //   (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
    //   let firstCity = _.head(nextProps.selectedMap.mapData.locations)
    //   this.zoomToCity(firstCity)
    //   return true
    // }
    if (this.state.scale !== nextState.scale) {
      console.log('this.state.scale !== nextState.scale', this.state.scale, nextState.scale)

      this.zoomToScale(nextState.scale)
      return true
    }
    return false
  }

  render () {
    let {width, height} = this.props
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
      zIndex: '999',
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
    const currentIndex = _.indexOf(this.state.scale, this.scales)
    const currentValue = currentIndex + 1

    console.log('rerendering', this.state.scale, currentIndex, currentValue, this.scales, this.scales[currentIndex])

    return (
      <div styleName="container">
        <div style={svgMapContainerStyle} className="svg-map-container" ref={this.containerRef} />
        <div className="marker-tooltip" />
        <div styleName="zoom-bar-wrapper">
          <div styleName="zoom-in" onClick={this.nextStep}>+</div>
          <Slider className="zoom-bar"
            vertical={true}
            min={1}
            max={4}
            defaultValue={1}
            value={currentValue}
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
