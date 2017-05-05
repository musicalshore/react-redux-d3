
import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import _ from 'lodash'
import locations from 'best-driver.json'
import 'jvectormap-next'
import './jquery-jvectormap-us-aea-en'
import './jquery-jvectormap-world-mill-en'
import './style.scss'

const defaultFill = '#0096d6'
const defaultStroke = '#fff'
const defaultClass = 'jvectormap-marker jvectormap-element'
const defaultYear = '2016'
const defaultMap = 'top-city'
const newLocationColor = '#6db33f'
const mostImprovedColor = '#f3c303'

const formatMarkers = (locations, selectedMap, selectedYear) => {
  // const type = `${selectedYear} ${selectedMap.type}`
  return locations.map((location) => {
    let marker = {
      id: true,
      style: {
        fill: defaultFill,
        stroke: defaultStroke,
        class: defaultClass
      },
      dataObj: location,
      latLng: [ location.Lat, location.Lon ],
      name: location.City + ', ' + location.State
    }
    if (selectedMap.id === defaultMap && selectedYear === defaultYear) {
      if (location.New) {
        marker.style.fill = marker.style.stroke = newLocationColor
        marker.style.class += ' new-location'
      } else if (location.Improved) {
        marker.style.fill = marker.style.stroke = mostImprovedColor
        marker.style.class += ' most-improved'
      }
    }
    return marker
  })
}


const getTopMarkers = (count, markers, selectedMap, selectedYear) => {
  let type = `${selectedYear} ${selectedMap.type}`
  let sortedMarkers = _.sortBy(markers, (marker) => _.get(marker, 'dataObj.' + type))
  let topMarkers = sortedMarkers.slice(0, count)
  return topMarkers

  //         // model.viewModel.map.setSelectedMarkers(j);
  //         // $('circle[data-index="'+i+'"]').css('fill', model.viewModel.color);
}

const createMap = (locations, selectedMap, selectedYear) => {
  const markers = formatMarkers(locations, selectedMap, selectedYear)
  // console.log('markers', markers)
  const formattedMap = Object.assign({}, selectedMap, { markers: markers })
  console.log('formattedMap', formattedMap)
  return formattedMap
}

const VectorMap = class VectorMap extends React.Component {
  componentDidMount () {
    this.$node = $(this.refs.vectorMap)
    const formattedMap = createMap(locations, this.props.selectedMap, this.props.selectedYear)
    this.$node.vectorMap(formattedMap)
    const topMarkers = getTopMarkers(10, formattedMap.markers, this.props.selectedMap, this.props.selectedYear)
    this.jvm = this.$node.vectorMap('get', 'mapObject')
  }
  componentDidUpdate () {
    console.log('componentDidUpdate', this.jvm)

    // const formattedMap = createMap(locations, this.props.selectedMap, this.props.selectedYear, this.$node.vectorMap)
    // const topMarkers = getTopMarkers(10, formattedMap.markers, this.props.selectedMap, this.props.selectedYear)
    // this.$node.vectorMap(createMap(locations, this.props.selectedMap, this.props.selectedYear))
  }

  render () {
    return (
      <div styleName="container">
        <div styleName="vector-map" ref="vectorMap" />
      </div>
    )
  }
}

VectorMap.propTypes = {
  selectedMap: PropTypes.object,
  selectedYear: PropTypes.string
}

export default VectorMap
