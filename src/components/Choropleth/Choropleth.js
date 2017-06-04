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
    height: 625,
    zoomToCityScale: 4
  }

  containerRef = (el) => {
    this.container = el
  }
  handleRange = (scale) => {
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
  onStop = () => {
    console.log('onStop', arguments)

    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }

  updateMarkers = (markers) => {
    console.log('updateMarkers')
    const data = _.map((m) => {
      const points = this.projection(_.reverse(m.latLng))
      return _.extend({
        cx: points[0],
        cy: points[1],
        r: m.seriesValue === 'topTen' ? '16px' : '5px'
        // isNew: !!m.newLocation,
        // mostImproved: !!m.mostImproved
      }, m)
      // }, _.pick(['rank', 'city', 'seriesValue', 'latLng'], m))
    }, markers)

    const circle = this.g
      .selectAll('circle')
      .data(data)

    circle.exit().remove()

    circle.enter()
      .append('circle')
        .on('click', this.handleMarkerClick)
        .attr('cx', (d) => d.cx)
        .attr('cy', (d) => d.cy)
        .attr('r', (d) => d.r)
        .attr('class', (d) => {
          let className = `marker ${_.kebabCase(this.props.selectedMap.id)}`
          if (this.props.selectedMap.id === TOP_CITY) {
            if (d.newLocation) {
              className += ' new-location'
            }
            if (d.mostImproved) {
              className += ' most-improved'
            }
          }
          return className
        })
      .select(function () { return this.parentNode })
      .filter((d) => d.rank <= 10).append('text')
        .text(d => d.rank)
        .attr('x', d => d.cx)
        .attr('y', d => d.cy + 3)
        .attr('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', '#ffffff')
  }
/*
  updateNumbers (selection, props = this.props) {
    const markers = _.filter(marker => marker.seriesValue === 'topTen', props.selectedMap.mapData.markers)
    const text = selection.selectAll('text')
      .data(markers)
    text.exit().remove()
    console.log('markers', markers)
    text
      .enter().append('text')
      .merge(text)
      .text(d => d.rank)
      .attr('x', marker => {
        let lat = marker.latLng[0]
        let lon = marker.latLng[1]
        let points = this.projection([lon, lat])
        if (!points || !points[1]) {
          throw new Error('Missing coordinates', marker)
        }
        return points[0]
      })
      .attr('y', marker => {
        let lat = marker.latLng[0]
        let lon = marker.latLng[1]
        let points = this.projection([lon, lat])
        if (!points || !points[1]) {
          throw new Error('Missing coordinates', marker)
        }
        return points[1] + 3
      })
      .attr('text-anchor', 'middle')
      .style('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', '#ffffff')
      .on('click', this.onMarkerClick)
  }
*/
  zoomed = () => {
    this.svg.select('g').style('stroke-width', `${1.5 / d3.event.scale}px`)
    // this.g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
    this.svg.selectAll('g').attr('transform', d3.event.transform)
  }

  zoomToCity = (selectedCity) => {
    let { width, height, zoomToCityScale } = this.props
    console.log('coords', _.reverse(selectedCity.latLng))

    let point = { 'type': 'Point', 'coordinates': _.reverse(selectedCity.latLng) }
    console.log('point', point)

    const centroid = this.path.centroid(point)
    console.log('centroid', centroid)
    const translateX = width / 2 - zoomToCityScale * centroid[0]
    const translateY = height / 2 - zoomToCityScale * centroid[1]
    console.log('translateX, translateY', translateX, translateY)
    this.svg.transition()
      .duration(750)
    // this.zoom.scaleTo(this.svg.transition().duration(750), zoomToCityScale)
      // .call(this.zoom.scaleTo(zoomToCityScale).translateBy(translateX, translateY))
      .call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomToCityScale))
  }

  zoomOut () {
    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity)
  }

  // lifecycle methods

  // constructor (props) {
  //   super(props)

  // }
  componentDidMount () {
    let { width, height } = this.props
    console.log('componentDidMount ')
    const markers = _.get('selectedMap.mapData.markers', this.props)
    if (!markers) {
      throw new MapError(`No markers to add.`)
    }

    this.projection = d3.geoAlbersUsa()
    this.path = d3.geoPath().projection(this.projection)
    this.projection
      .scale(1000)
      .translate([width / 2, height / 2])
    this.zoom = d3.zoom()
      .scaleExtent([1, 7])
      .on('zoom', this.zoomed)
    this.svg = d3.select(this.container)
      .append('svg')
        .attr('viewBox', `0 0 ${this.props.width} ${this.props.height}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        // .attr('width', this.props.width)
        // .attr('height', this.props.height)
        .classed('svg-map-content', true)
        .call(this.zoom)

    this.rect = this.svg.append('rect')
    this.rect
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .classed('svg-map-background', true)
        // .on('click', zoomOut)
    this.g = this.svg.append('g')
    this.g
      .selectAll('path')
        .data(topojson.feature(topodata, topodata.objects.states).features)
        .enter().append('path')
        .attr('d', this.path)
        .classed('svg-map-feature', true)
      .select(function () { return this.parentNode })
      .append('path')
        .datum(topojson.mesh(topodata, topodata.objects.states, (a, b) => a !== b))
        .attr('d', this.path)
        .classed('svg-map-mesh', true)

    this.updateMarkers(markers)
  }
  // componentWillReceiveProps (nextProps) {

  // }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    let { selectedMap } = this.props
    if ((selectedMap.id !== nextProps.selectedMap.id) ||
        (selectedMap.year !== nextProps.selectedMap.year) ||
        (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      console.log('YES shouldComponentUpdate')

      this.updateMarkers(nextProps.selectedMap.mapData.markers)
    }
    if (nextProps.selectedCity) {
      console.log('nextProps.selectedCity', nextProps.selectedCity)

      this.zoomToCity(nextProps.selectedCity)
    } else if (nextProps.selectedMap.stateFilter && (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      let firstCity = _.head(nextProps.selectedMap.mapData.markers)
      this.zoomToCity(firstCity)
    } else if (this.state.scale !== nextState.scale) {
      this.handleRange(nextState.scale)
    }
    return false
  }

  render () {
    // let {width, height} = this.state

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
        <div width="715" height="625" ref={this.containerRef} />
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
