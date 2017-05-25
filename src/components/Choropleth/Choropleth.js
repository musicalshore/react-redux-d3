/* eslint-disable no-return-assign */
import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import topodata from './us.json'
import {TOP_CITY} from 'constants/maps'
import './style.scss'
import 'rc-slider/assets/index.css'

const projection = d3.geoAlbersUsa()
const path = d3.geoPath().projection(projection)
const zoom = d3.zoom()
      .scaleExtent([1, 7])
      .on('zoom', zoomed)

function zoomed () {
  d3.select('svg > g').style('stroke-width', 1.5 / d3.event.scale + 'px')
  // this.g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
  d3.select('svg > g').attr('transform', d3.event.transform)
}

function zoomIn (props, state) {
  let { width, height } = props

}
function zoomToCity (props) {
  let { width, height, selectedCity } = props
  let lat = selectedCity.latLng[0]
  let lon = selectedCity.latLng[1]
  let point = { 'type': 'Point', 'coordinates': [lon, lat] }
  const centroid = path.centroid(point)
  console.log('centroid', centroid, point, selectedCity)
  const x = centroid[0]
  const y = centroid[1]
  const scale = 4
  // const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
  const translateX = width / 2 - scale * x
  const translateY = height / 2 - scale * y

  console.log('scale', scale, 'translate', translateX, translateY)

  d3.select('svg').transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))
}

function zoomOut () {
  d3.select('svg').transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity)
}

const Choropleth = class Choropleth extends React.Component {
  constructor (props) {
    super(props)

    // this.onZoom = this.onZoom.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    // this.onStop = this.onStop.bind(this)
    // this.onReset = this.onReset.bind(this)

    this.addMap = this.addMap.bind(this)
    this.addFeatures = this.addFeatures.bind(this)
    this.addMesh = this.addMesh.bind(this)
    this.updateMarkers = this.updateMarkers.bind(this)
    this.updateNumbers = this.updateNumbers.bind(this)
    this.handleRange = this.handleRange.bind(this)
    this.state = {scale: zoom.scaleExtent()[0]}
  }
  handleRange (scale) {
    console.log("handleRange  scale", scale)
    let {width, height} = this.props
    // // this.setState({scale: event})
    const translateX = (width * 1000) / 2
    const translateY = (height * 1000) / 2
    d3.select('svg')
      .transition()
      .duration(750)
      .call(zoom.scaleTo, scale)
      // .duration(750)
      // .call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale))
  }
  addMap (selection) {
    selection.selectAll('path')
      .call(this.addFeatures)
    selection.append('path')
      .call(this.addMesh)
  }

  updateMarkers (selection, props = this.props) {
    const markers = _.cloneDeep(props.selectedMap.mapData.markers)
    selection.selectAll('g').remove()
    const g = selection.selectAll('g')
      .data(markers)
    g.enter().append('g')
      .on('click', this.onMarkerClick)
      .append('circle')
        .attr('cx', marker => {
          let lat = marker.latLng[0]
          let lon = marker.latLng[1]
          let points = projection([lon, lat])
          if (!points || !points[1]) {
            throw new Error('Missing coordinates', marker)
          }
          return points[0]
        })
        .attr('cy', marker => {
          let lat = marker.latLng[0]
          let lon = marker.latLng[1]
          let points = projection([lon, lat])
          if (!points || !points[1]) {
            throw new Error('Missing coordinates', marker)
          }
          return points[1]
        })
        .attr('r', d => d.seriesValue === 'topTen' ? '16px' : '5px')
        .attr('class', (d) => {
          let className
          if (d.newLocation && props.selectedMap.id === TOP_CITY) {
            className = 'new-location'
          } else if (d.mostImproved && props.selectedMap.id === TOP_CITY) {
            className = 'most-improved'
          } else {
            className = _.kebabCase(props.selectedMap.id)
          }
          return `marker ${className}`
        })
      .select(function () { return this.parentNode })
        .append('text')
        .text(d => d.rank <= 10 ? d.rank : '')
        .attr('x', marker => {
          let lat = marker.latLng[0]
          let lon = marker.latLng[1]
          let points = projection([lon, lat])
          if (!points || !points[1]) {
            throw new Error('Missing coordinates', marker)
          }
          return points[0]
        })
        .attr('y', marker => {
          let lat = marker.latLng[0]
          let lon = marker.latLng[1]
          let points = projection([lon, lat])
          if (!points || !points[1]) {
            throw new Error('Missing coordinates', marker)
          }
          return points[1] + 3
        })
        .attr('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', '#ffffff')
  }

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
        let points = projection([lon, lat])
        if (!points || !points[1]) {
          throw new Error('Missing coordinates', marker)
        }
        return points[0]
      })
      .attr('y', marker => {
        let lat = marker.latLng[0]
        let lon = marker.latLng[1]
        let points = projection([lon, lat])
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
  addFeatures (selection) {
    selection
      .data(topojson.feature(topodata, topodata.objects.states).features)
      .enter().append('path')
      .attr('d', path)
      .attr('class', 'feature')
  }

  addMesh (selection) {
    selection
      .datum(topojson.mesh(topodata, topodata.objects.states, (a, b) => a !== b))
      .attr('class', 'mesh')
      .attr('d', path)
  }

  onStop () {
    console.log('onStop', arguments);

    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }

  onMarkerClick (d) {
 console.log("onMarkerClick ", d);
    this.props.onMarkerClick(d)
  }
  componentDidMount () {
    let { width, height } = this.props
    projection
      .scale(1000)
      .translate([width / 2, height / 2])
    // d3.select(this.svg).on('click', this.onStop, true)
    d3.select(this.rect).on('click', zoomOut)
    d3.select(this.g).call(this.addMap)
    d3.select(this.g).call(this.updateMarkers)
    // d3.select(this.g).call(this.updateNumbers)
    // d3.select(window).on('resize', resize)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let { selectedMap, selectedCity } = this.props
    console.log('shouldComponentUpdate', selectedCity, nextProps.selectedCity)
    if ((selectedMap.id !== nextProps.selectedMap.id) ||
        (selectedMap.year !== nextProps.selectedMap.year) ||
        (selectedMap.stateFilter !== nextProps.selectedMap.stateFilter)) {
      console.log('YES shouldComponentUpdate')

      d3.select(this.g).call(this.updateMarkers, nextProps)
      // d3.select(this.g).call(this.updateNumbers, nextProps)
    }
    // d3.select(this.svg).call(zoomIn, nextProps)
    if (!nextProps.selectedCity) {
      // d3.select(this.svg).call(zoomOut)
      // zoomOut()
    } else {
      zoomToCity(nextProps)
    }

    //  else {
    //   d3.select(this.svg).call(zoomIn, nextProps)
    // }
    return false
  }

  resize () {
    // adjust things when the window size changes
    // let width = parseInt(d3.select(this.svg).style('width'))
    // height = width * mapRatio;

    // // update projection
    // projection
    //     .translate([width / 2, height / 2])
    //     .scale(width);

    // // resize the map container
    // map
    //     .style('width', width + 'px')
    //     .style('height', height + 'px');

    // // resize the map
    // map.select('.land').attr('d', path);
    // map.selectAll('.state').attr('d', path);
  }

  render () {
    const handleStyle = {
      backgroundColor: '#0096d6',
      width: '15px',
      height: '15px',
      borderRadius: '300px',
      overflow: 'visible'
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
      // position: 'absolute'
    })
    const maximumTrackStyle = _.extend(trackStyle, {
      // position: 'absolute'
    })

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
        <svg width={this.props.width} height={this.props.height} ref={(node) => this.svg = node}>
          <rect styleName="background" width={this.props.width} height={this.props.height} ref={(node) => this.rect = node} />
          <g ref={(node) => this.g = node} />
        </svg>
        <div styleName="zoom-bar-wrapper">
          {/*<div styleName="zoom-in">+</div>*/}
          <Slider className="zoom-bar"
            vertical={true}
            min={zoom.scaleExtent()[0]}
            max={zoom.scaleExtent()[1]}
            defaultValue={zoom.scaleExtent()[0]}
            onChange={this.handleRange}
            handleStyle={handleStyle}
            step={2}
            />
          {/*{<div styleName="zoom-out">-</div>}*/}
        </div>
      </div>
    )
  }
}

Choropleth.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object,
  onMarkerClick: PropTypes.func.isRequired
}
export default Choropleth
