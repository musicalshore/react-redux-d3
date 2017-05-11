import _ from 'lodash/fp'
import $ from 'jquery'
import 'jquery-ui/themes/base/core.css'
// import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/slider.css'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/slider'
import React from 'react'
import PropTypes from 'prop-types'
import 'jvectormap-next'
// import jvectormapCss from 'jvectormap-next/jquery-jvectormap.css'
import './jquery-jvectormap-us-aea-en'
import './jquery-jvectormap-world-mill-en'
import style from './style.scss'


const bringMarkerToTop = _.each(marker => {
  const selector = `circle[data-index="${marker.index}"]`
  const path = $(selector)
  const pathParent = $(selector).parent()
  const x = path.attr('cx')
  const y = parseInt(path.attr('cy')) + 4
  const text = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <text data-index="${marker.index}" text-anchor="middle"  x="${x}" y="${y}" style="fill: #fff; font-size: 11px;">${marker.rank}</text>
    </svg>
  `
  if (path.attr('r') > 5) {
    $(pathParent).append(path)
    $(pathParent).append(text)
  }
})

const VectorMap = class VectorMap extends React.Component {
  constructor () {
    super()
    this.jvectormap = this.jvectormap.bind(this)
    this.zoomBar = this.zoomBar.bind(this)
    this.setMap = this.setMap.bind(this)
    this.addZoomBar = this.addZoomBar.bind(this)
    this.panMapToMarkers = this.panMapToMarkers.bind(this)
  }
  componentDidMount () {
    console.log('this.props.mapData', this.props)
    this.$el = $(this.el)
    console.log('this.jvm', this.jvm)
    this.$zoomBar = $(this.zoomBar)
    this.setMap()
    this.addZoomBar()
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
    const jvm = this.$el.vectorMap('get', 'mapObject')
    const markersGroup = jvm.markersGroup
    console.log('jvm', jvm)

    // update the top 10
    const topTen = _.slice(0, 10, _.sortBy('rank', this.props.mapData.markers))
/*
    const topTenTextGroup = jvm.canvas.addGroup()
    const textStyle = {
      initial: {
        // 'font-family': 'Arial',
        'font-size': '12',
        'font-weight': 'normal',
        cursor: 'default',
        'text-anchor': 'middle',
        fill: 'white',
        display: 'visible'
      }
    }
    _.each(marker => {
      const jvmMarker = jvm.markers[marker.index].element
      console.log('jvmMarker.config', jvmMarker.config)

      const textSVG = jvmMarker.config.canvas.addText({
        'data-index': marker.index,
        x: jvmMarker.config.cx,
        y: jvmMarker.config.cy,
        text: marker.rank
      }, textStyle, topTenTextGroup)
      textSVG.addClass('jvectormap-marker jvectormap-element')
      console.log(marker, jvm.markers[marker.index])
    }, topTen)
*/
    bringMarkerToTop(topTen)
  }

  jvectormap (el) {
    this.el = el
  }

  zoomBar (zoomBar) {
    this.zoomBar = zoomBar
  }
  addZoomBar () {
    // $('.tabContentMap').prepend(html);
    this.$zoomBar.slider({
      value: 1,
      min: 1,
      max: 4,
      step: 1,
      orientation: 'vertical',
      slide: function (event, ui) {
        const mapObj = this.$el.vectorMap('get', 'mapObject')
        let rounded = Math.round(ui.value)
        switch (ui.value) {
          case 1:
            rounded = 0
            break
          case 2:
            rounded = 2
            break
          case 3:
            rounded = 4
            break
          case 4:
            rounded = 8
            break
        }

        mapObj.setFocus(rounded, 0.5, 0.5)
        // closeModal(event);
      }.bind(this)
    })
  }
  render () {
    return (
      <div styleName="style.container">
        <div styleName="style.vector-map" ref={this.jvectormap}>
        </div>
        <div styleName="zoom-bar-wrapper">
          <div ref={this.zoomBar}>
            <div styleName="style.zoom-tick"></div>
            <div styleName="style.zoom-tick"></div>
            <div styleName="style.zoom-tick"></div>
            <div styleName="style.zoom-tick"></div>
            <div />
          </div>
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
