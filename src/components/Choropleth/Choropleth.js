import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import topodata from './us.json'
import './style.scss'

let projection
let path

const Choropleth = class Choropleth extends React.Component {
  constructor (props) {
    super(props)
    console.log('props', props)

    this.state = {active: d3.select(null)}
    this.onZoom = this.onZoom.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onReset = this.onReset.bind(this)

    this.addMap = this.addMap.bind(this)
    this.addFeatures = this.addFeatures.bind(this)
    this.addMesh = this.addMesh.bind(this)
    this.updateMarkers = this.updateMarkers.bind(this)
    this.updateNumbers = this.updateNumbers.bind(this)
  }
  addMap (selection) {
    selection.selectAll('path')
      .call(this.addFeatures)
    selection.append('path')
      .call(this.addMesh)
  }

  updateMarkers (selection, props = this.props) {
    console.log("this.props ", this.props);
    const markers = _.cloneDeep(props.selectedMap.mapData.markers)
    const className = _.kebabCase(props.selectedMap.id)
    const circle = selection.selectAll('circle')
      .data(markers)
    circle.exit().remove()
    circle
      .enter().append('circle')
      .merge(circle)
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
      .attr('class', `marker ${className}`)
      .on('click', this.onClick)
    // return selection
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
      .on('click', this.onClick)
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

  onClick (d) {
    let { width, height } = this.props
    if (this.state.active.node() === d3.event.target) return this.onReset()
    this.state.active.classed('active', false)
    this.setState({active: d3.select(d3.event.target).classed('active', true)})

    let lat = d.latLng[0]
    let lon = d.latLng[1]
    // let points = projection([lon, lat])
    // let points = [lon, lat]
    let point = { 'type': 'Point', 'coordinates': [lon, lat] }
    // const bounds = path.bounds(point)
    const centroid = path.centroid(point)
    console.log('centroid', centroid, point, d)
    const x = centroid[0]
    const y = centroid[1]
    const scale = 4
    // const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
    const translate = [width / 2 - scale * x, height / 2 - scale * y]

    console.log('scale', scale, 'translate', translate)

    d3.select(this.svg).transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
  }
  onReset () {
    this.state.active.classed('active', false)
    this.setState({active: d3.select(null)})

    d3.select(this.svg).transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity)
  }
  onZoom () {
    d3.select(this.g).style('stroke-width', 1.5 / d3.event.scale + 'px')
    // this.g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
    d3.select(this.g).attr('transform', d3.event.transform)
  }
  onStop () {
    if (d3.event.defaultPrevented) d3.event.stopPropagation()
  }

  componentDidMount () {
    console.log('componentDidMount', this.props.mapData, this.props.selectedMap)
    let { width, height } = this.props
    projection = d3.geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2])
    path = d3.geoPath().projection(projection)

    this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.onZoom)
    this.d3Map = d3.select(this.g)
    this.d3Map.call(this.addMap)
    this.d3Map.call(this.updateMarkers)
    this.d3Map.call(this.updateNumbers)
    // d3.select(this.svg)
    //   .on('click', this.onStop, true)
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps.selectedMap.mapData.markers, this.props.selectedMap)
    this.d3Map = d3.select(this.g)
    this.d3Map.call(this.updateMarkers, nextProps)
    this.d3Map.call(this.updateNumbers, nextProps)

    return false
  }

  render () {
    return (
      <div styleName="container">
        <svg width={this.props.width} height={this.props.height} ref={(node) => this.svg = node}>
          <rect styleName="background" width={this.props.width} height={this.props.height} />
          <g ref={(node) => this.g = node} />
        </svg>
        <div styleName="zoom-bar-wrapper">
          <Slider vertical min={0} max={6} defaultValue={1} step={2} />
        </div>
      </div>
    )
  }
}

  // render() {
    // const featurePaths = _.map((data) => {
    //   const d = this.path(data)
    //   return (
    //     <path key={_.uniqueId()} d={d} className="feature" onClick={this.onClick}/>
    //   )
    // }, this.props.feature)

    // const meshPaths = _.map((data) => {
    //   const d = this.path(data)
    //   return (
    //     <path key={_.uniqueId()} d={d} className="mesh"  />
    //   )
    // }, this.props.mesh)

    /* return (
      <div>
        <svg width={this.props.width} height={this.props.height} ref={(el) => this.svg = el}>
          <rect className="background" width={this.props.width} height={this.props.height} />
          <g ref={(el) => this.g = el}>
            {featurePaths}
            {meshPaths}
          </g>
        </svg>
      </div>
    )
  }*/
// })
Choropleth.propTypes = {
  // mapData: PropTypes.shape({
  //   markers: PropTypes.array.isRequired,
  //   series: PropTypes.object.isRequired
  // }),
  // data: PropTypes.object.isRequired,
  selectedMap: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
}
export default Choropleth
