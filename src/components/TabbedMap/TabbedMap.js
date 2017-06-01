import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import CityModal from 'components/CityModal'
import Choropleth from 'components/Choropleth'
import MapSelector from 'components/MapSelector'
import TopListings from 'components/TopListings'
import TabNav from 'components/TabNav'
import './style.scss'


const Social = () => {
  return (
    <div styleName="social-container">

    </div>
  )
}
const Legend = () => {
  return (
    <div styleName="legend-container">
      <ul>
        <li><span styleName="blue">&bull;</span> Top Cities</li>
        <li><span styleName="yellow">&bull;</span> Most Improved</li>
        <li><span styleName="green">&bull;</span> New Additions</li>
      </ul>
    </div>
  )
}

const TabbedMap = class TabbedMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selectedMarker: null }
    this.zoomBar = this.zoomBar.bind(this)
    // this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.getModalParent = this.getModalParent.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    let {selectedCity, modalIsOpen} = this.props
    if (!prevProps.selectedCity && selectedCity && !modalIsOpen) {
      this.openModal()
    }
  }


  zoomBar (el) {
    this.el = el
  }

  // openModal () {
  //   this.setState({modalIsOpen: true})
  // }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  getModalParent () {
    return document.querySelector('#app')
  }

  render () {
    let {onCitySelect} = this.props

    return (
      <div styleName="container">
        <MapSelector {...this.props}/>
        <div styleName="map-container">
          <div styleName="maps">
            <TabNav {...this.props} />
            <Choropleth {...this.props} onMarkerClick={onCitySelect} width="715" height="625" />
            {/*<div styleName="timeLine-SocialContainer">

              <div styleName="socialContainer">
                <div id="pageShare"></div>
              </div>
            </div>*/}
          </div>
          <div styleName="top-listings">
            <TopListings {...this.props} />
          </div>
        </div>
        <Legend />
        <CityModal {...this.props} />
      </div>
    )
  }
}

TabbedMap.propTypes = {
  onMapSelect: PropTypes.func.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  onFilterState: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  defaultYear: PropTypes.string.isRequired,
  defaultMap: PropTypes.string.isRequired,
  selectedCity: PropTypes.object
}

export default TabbedMap
