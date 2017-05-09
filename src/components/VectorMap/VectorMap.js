
import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import _ from 'lodash/fp'
import locations from 'best-driver.json'
import 'jvectormap-next'
import './jquery-jvectormap-us-aea-en'
import './jquery-jvectormap-world-mill-en'
import './style.scss'

const VectorMap = class VectorMap extends React.Component {
  constructor () {
    super()
    this.jvectormap = this.jvectormap.bind(this)
    this.setMap = this.setMap.bind(this)
    this.panMapToMarkers = this.panMapToMarkers.bind(this)
  }
  componentDidMount () {
    console.log('this.props.mapData', this.props)
    this.$el = $(this.el)
    this.setMap()
  }
  componentWillUnmount () {
    // console.log("componentDidUnmount ")
  }
  componentDidUpdate () {
    // console.log('componentDidUpdate', this.props.options)
    $('.jvectormap-container').remove()
    this.setMap()
  }

  panMapToMarkers (index) {
    const mapObj = this.$el.vectorMap('get', 'mapObject')
    const marker = this.props.mapData.markers[index]
    const lat = marker.latLng[0]
    const lng = marker.latLng[1]
    mapObj.setFocus({ lat, lng, scale: 8 })
  }

  setMap () {
    let vectorMap = _.extend(this.props.mapData, {
      onMarkerClick: function (e, selectedCity) {
        this.props.onMarkerClick(selectedCity)
        this.panMapToMarkers(selectedCity)
      }.bind(this)
    })

    this.$el.vectorMap(vectorMap)
  }
  jvectormap (el) {
    this.el = el
  }

  render () {
    return (
      <div styleName="container">
        <div styleName="vector-map" ref={this.jvectormap}>
        </div>
      </div>
    )
  }
}

VectorMap.propTypes = {
  mapData: PropTypes.shape({
    markers: PropTypes.array.isRequired,
    series: PropTypes.object.isRequired
  }),
  onMarkerClick: PropTypes.func.isRequired,
  selectedCity: PropTypes.string
}
// VectorMap.propTypes = {
//   mapData: PropTypes.shape({
//     markers: (props, propName, componentName) => {
//       if (_.isEmpty(props[propName])) {
//         return new Error(
//           `Marker values don't exist for prop "${propName}" supplied to "${componentName}" Validation failed.`
//         )
//       }
//     },
//     series: (props, propName, componentName) => {
//       if (_.isEmpty(_.get(propName + '.markers[0].values', props))) {
//         return new Error(
//           `Series values don't exist for prop "${propName}" supplied to "${componentName}" Validation failed.`
//         )
//       }
//     }
//   })
// }

export default VectorMap
