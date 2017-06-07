import './style.scss'
import 'rc-slider/assets/index.css'

import * as d3 from 'd3'
import * as topojson from 'topojson-client'

import {func, object, number} from 'prop-types'

/* eslint-disable no-return-assign */
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
  // console.log('marker', marker)
  return marker
}

const Choropleth = class Choropleth extends React.Component {
  state = {scale: 1}
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
    // aspectRatio: 0.874,
    height: 625,
    zoomToCityScale: 4
  }

  containerRef = (el) => {
    this.container = el
  }
  handleRange = (scale) => {
    console.log('handleRange ', scale)
    // let {width, height} = this.props
    // this.setState({scale})
    // const translateX = (width * 1000) / 2
    // const translateY = (height * 1000) / 2
    // d3.select('svg')
    //   .transition()
    //   .duration(750)
    //   .call(zoom.scaleTo, scale)
      // .duration(750)
      // .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))
    d3.select('svg')
      .transition()
      .duration(750)
      .call(this.zoom.scaleTo, scale)
    this.setState({scale})
  }
  handleMarkerClick = (datum) => {
    console.log('handleMarkerClick selectedCity', datum)
    this.props.onCitySelect(_.omit(['cx', 'cy', 'r', 'class'], datum))
  }
  stopped = () => {
    console.log('stopped', arguments)
    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }
  updateMarkers = (locations) => {
    console.log('updateMarkers')

    this.gMarkers.selectAll('g').remove()
    const markers = _.map(Marker, locations)

    const g = this.gMarkers
      .selectAll('g')
      .data(markers, (d) => _.join('_', d.lngLat))

    g.enter()
      .append('g')
        .on('click', this.handleMarkerClick)
        .attr('transform', (d) => {
          let point = projection(d.lngLat)
          return `translate(${point[0]}, ${point[1]})`
        })
        .on('mouseover', (d) => {
          console.log('mouseover', d.cityState)
          // this.tooltip.transition()
          //   .duration(200)
          //   .style('opacity', 0.9)
          this.tooltip.html(d.cityState)
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY - 28}px`)
        })
        .on('mouseout', (d) => {
          this.tooltip.transition()
            .duration(200)
            .style('opacity', 0)
        })
        .attr('class', (d) => d.className)
        .append('circle')
          // .attr('cx', (d) => d.cx)
          // .attr('cy', (d) => d.cy)
          .attr('r', (d) => d.r)
          .select(function (d) { return this.parentNode })
        .filter((d) => d.seriesValue === 'topTen')
          .append('text')
            // .attr('x', d => d.cx)
            // .attr('y', d => d.cy + 3)
            .style('font-size', '0.688em')
            .text(d => d.rank)
            .classed('rank', true)
  }

  zoomed = () => {
    let { width, height } = this.props
    let {k, x, y} = d3.event.transform
    // console.log('d3.event.transform', d3.event.transform)

    // const locations = _.get('selectedMap.mapData.locations', this.props)
    // console.log('d3.event.transform', d3.event.transform, arguments)
    // const g = d3.selectAll('svg > g')
    this.gMain.attr('transform', `translate(${x}, ${y})scale(${k})`)
    this.gFeatures.style('stroke-width', `${1 / k}px`)
    // this.gMarkers.selectAll('g').attr('transform', `translate(0,0)scale(${1 / k})`)

    this.gMarkers.selectAll('circle')
      .attr('r', (d) => d.r / k)
      .style('stroke-width', `${1 / k}px`)
    this.gMarkers.selectAll('text').style('font-size', (d) => `${0.688 / k}em`)

    // this.gFeatures.attr('transform', `translate(${x}, ${y})scale(${k})`)
    // this.gMarkers.attr('transform', `translate(${x}, ${y})scale(${k})`)

    // let markers = this.gMarkers.selectAll('.marker')
/*
    this.gMarkers
      .attr('transform', function (d) {
        // console.log('d.point', d.point)
        let point = d3.event.transform.invert(d.point)
        // console.log('invert', point)
        // const translateX = width / 2 - (1 / k) * d.cx
        // const translateY = height / 2 - (1 / k) * d.cy
        // let tx = d.cx - x
        // const t = d3.zoomTransform(this)
        // console.log('transform ', t)
        // const t = transform.translate
        let fo = `translate(${point[0]}, ${point[1]})scale(${1 / k})`
        console.log('fo', fo)
        return fo
      })
*/
    // this.gMarkers.selectAll('g').attr('transform', function (d) {
    //   var t = d3.event.transform.translate
    //   // var t = d3.transform(d3.select(this).attr("transform")).translate;//maintain aold marker translate
    //   return 'translate(' + t[0] + ',' + t[1] + ')scale(' + 1 / k + ')'// inverse the scale of parent
    //   // d3.event.transform
    // })
    // this.gMarkers.selectAll('circle').attr('r', (d) => {
    //   let r = d.r / k
    //   console.log('circle data', d, r)
    //   return r
    //   // let r = `${d.r / k}px`
    //   // `${d.r / k}px`
    // })
    // this.gMarkers.selectAll('.rank').attr('font-size', (d) => {
    //   let fontSize = d['font-size'] / k
    //   console.log('text data', d, fontSize)
    //   return fontSize
    //   // `${d['font-size'] / k}em`
    // })
    // this.gMarkers.selectAll('g').attr('transform', d3.event.transform)
    // this.updateMarkers(locations)
    // this.gMarkers.style('stroke-width', `${1 / d3.event.transform.k}px`)

    // this.g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
    // this.gMarkers('attr')
    // this.gFeatures.attr('transform', d3.event.transform)
    // this.gMarkers.selectAll('g').attr('transform', (d) => {
    //   console.log('D', d)
    //   const translateX = x - k * d.cx
    //   const translateY = y - k * d.cy
    //   return `translate(${translateX}, ${translateY})`
      // d3.zoomIdentity.translate(d3.event.transform.x, d3.event.transform.y))
    // })
  }

  zoomToCity = (location) => {
    console.log('zoomToCity ', location)
    let { width, height, zoomToCityScale } = this.props
    // let height = width * aspectRatio
    const marker = Marker(location)

    const point = { 'type': 'Point', 'coordinates': marker.lngLat }
    console.log('point', point)

    const centroid = path.centroid(point)
    console.log('centroid', centroid)
    const translateX = width / 2 - zoomToCityScale * centroid[0]
    const translateY = height / 2 - zoomToCityScale * centroid[1]
    console.log('translateX, translateY', translateX, translateY)
    this.svg.transition()
      .duration(300)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomToCityScale))

    // this.svg.transition()
    //   .duration(750)
    // this.zoom.scaleTo(this.svg.transition().duration(750), zoomToCityScale)
      // .call(this.zoom.scaleTo(zoomToCityScale).translateBy(translateX, translateY))
      // .call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomToCityScale))
      // .call(this.zoom.transform, (d, i) => {
      //   console.log('d, i', d, i)
      //   return d3.zoomIdentity
      // })
  }

  zoomOut () {
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity)
  }

  // lifecycle methods

  // constructor (props) {
  //   super(props)
  //   this.state.aspectRatio = props.height / props.width
  // }
  componentDidMount () {
    let { width, height } = this.props
    console.log('componentDidMount ')
    const locations = _.get('selectedMap.mapData.locations', this.props)
    if (!locations) {
      throw new MapError(`No locations to add after mount.`)
    }

    projection
      .scale(1000)
      .translate([width / 2, height / 2])

    this.svg = d3.select(this.container)
      .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .classed('svg-map-content', true)
        .on('click', this.stopped, true)

    this.rect = this.svg.append('rect')
    this.rect
      .attr('width', '100%')
      .attr('height', '100%')
      .classed('svg-map-background', true)
      .on('click', () => {
        console.log('rect clickt')
        this.svg.transition()
          .duration(750)
          .call(this.zoom.transform, d3.zoomIdentity)
      })
    this.gMain = this.svg.append('g').classed('main-group', true)
    this.gFeatures = this.gMain.append('g')
    this.gFeatures
      .selectAll('path')
        .data(topojson.feature(topodata, topodata.objects.states).features)
        .enter().append('path')
        .attr('d', path)
        .classed('svg-map-feature', true)

    this.gFeatures
      .append('path')
        .datum(topojson.mesh(topodata, topodata.objects.states, (a, b) => a !== b))
        .attr('d', path)
        .classed('svg-map-mesh', true)

    this.zoom = d3.zoom()
      .scaleExtent([1, 7])
      .on('zoom', this.zoomed)
    // this.gFeatures.call(this.zoom)
    this.svg.call(this.zoom)
      .on('touchmove.zoom', null)

    this.tooltip = d3.select('body')
      .append('div')
      .classed('marker-tooltip', true)
      // .attr('class', 'marker-tooltip')
      .style('display', 0)

    this.gMarkers = this.gMain.append('g').classed('markers', true)
    this.updateMarkers(locations)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    let { selectedMap } = this.props
    if ((selectedMap.id !== nextProps.selectedMap.id) ||
        (selectedMap.year !== nextProps.selectedMap.year) ||
        (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      console.log('YES shouldComponentUpdate')
      const locations = _.get('selectedMap.mapData.locations', nextProps)
      if (!locations) {
        throw new MapError(`No locations to add after update.`)
      }
      this.updateMarkers(locations)
    }
    if (nextProps.selectedCity) {
      console.log('nextProps.selectedCity', nextProps.selectedCity)

      this.zoomToCity(nextProps.selectedCity)
    } else if (nextProps.selectedMap.stateFilter && (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      let firstCity = _.head(nextProps.selectedMap.mapData.locations)
      this.zoomToCity(firstCity)
    } else if (this.state.scale !== nextState.scale) {
      console.log('calling handleRange', this.state.scale)

      this.handleRange(nextState.scale)
    }
    return false
  }

  render () {
    let {width, height} = this.props
    const svgMapContainerStyle = {
      // position: 'relative',
      // height: '0',
      // width: '100%',
      // padding: '0',
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
    const trackStyle = {
      width: '10px',
      height: '10px',
      cursor: 'pointer',
      lineHeight: '10px',
      textAlign: 'center',
      padding: '3px',
      background: '#666',
      border: 'solid 1px #e3e3e3',
      borderRadius: '0',
      color: '#0096d6',
      fontSize: '16px'
      // overflow: 'visible'
    }
    const minimumTrackStyle = _.extend(trackStyle, {
      position: 'absolute'
    })
    const maximumTrackStyle = _.extend(trackStyle, {
      // position: 'absolute'
    })
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
      '4': { style: markStyle },
      '6': { style: markStyle }
    }
    // const minTrackStyle = _.extend()
    // const Handle = Slider.Handle

    // const handle = (props) => {
    //   // const { value, dragging, index, ...restProps } = props;
    //   return (
    //       <Handle className='slider-handle' {...props} />
    //   )
    // }
    return (
      <div styleName="container">
        <div style={svgMapContainerStyle} className="svg-map-container" ref={this.containerRef} />
        {/* <div styleName="zoom-bar-wrapper">
          <div styleName="zoom-in">+</div>
          <Slider className="zoom-bar"
            vertical={true}
            min={this.zoom.scaleExtent()[0]}
            max={this.zoom.scaleExtent()[1]}
            defaultValue={this.state.scale}
            onChange={this.handleRange}
            handleStyle={handleStyle}
            marks={marks}
            step={null}
            />
          {<div styleName="zoom-out">-</div>}
        </div> */}
      </div>
    )
  }
}

export default Choropleth
