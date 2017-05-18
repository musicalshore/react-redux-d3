import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import MapSelector from 'components/MapSelector'
import TabNav from 'components/TabNav'
import Map from 'containers/Map'
import TopListings from 'components/TopListings'
import {CURRENT_YEAR} from 'constants/maps'
// import globalStyle from '../../global.scss'
import './style.scss'

/*const Ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return (
    <div>
      {n}<sup>{(s[(v - 20) % 10] || s[v] || s[0])}</sup>
    </div>
  )
}*/

const TabbedMap = class TabbedMap extends React.Component {
  constructor () {
    super()
    this.state = { modalIsOpen: false, selectedMarker: null }
    this.zoomBar = this.zoomBar.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getModalParent = this.getModalParent.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.selectedCity && this.props.selectedCity && !this.state.modalIsOpen) {
      const marker = _.find(['index', parseInt(this.props.selectedCity)], this.props.mapData.markers)
      this.setState({selectedMarker: marker})
      this.openModal()
    }
  }


  zoomBar (el) {
    this.el = el
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  closeModal () {
    this.props.onCitySelect(null)
    this.setState({modalIsOpen: false})
  }

  getModalParent () {
    return document.querySelector('#app')
  }

  render () {
    let {selectedMap, selectedCity, selectedState, onTabClick, onCitySelect} = this.props

    let isCurrentYear = selectedMap.year === CURRENT_YEAR
    let isBest = selectedCity !== null && selectedCity.rank === 1
    let thisYearsBest = isCurrentYear && isBest

    return (
      <div styleName="container">
        {/*<MapSelector onStateChange={onStateChange} onYearChange={onYearChange}selectedMap={selectedMap} selectedState={selectedState} />*/}
        <div styleName="map-container">
          <div styleName="maps">
            <TabNav onTabClick={onTabClick} selectedMap={selectedMap} />
            <Map width="715" height="625" selectedMap={selectedMap} onCitySelect={onCitySelect} />
            <div styleName="timeLine-SocialContainer">
              <div styleName="legendContainer">
                <ul>
                  <li><span styleName="blue">&bull;</span> Top Cities</li>
                  <li><span styleName="yellow">&bull;</span> Most Improved</li>
                  <li><span styleName="green">&bull;</span> New Additions</li>
                </ul>
              </div>
              <div styleName="socialContainer">
                <div id="pageShare"></div>
              </div>
            </div>
          </div>
          <div styleName="top-listings">
            <TopListings onCitySelect={onCitySelect} selectedMap={selectedMap} selectedCity={selectedCity} selectedState={selectedState} />
          </div>
        </div>
        { selectedCity !== null && selectedCity.rank &&
          <Modal isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            contentLabel="City Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <div className={`modal-container ${_.kebabCase(selectedMap.id)}`}>
              <div className="close" onClick={this.closeModal} />
              <div className="city-container">
                <h2 className="city-name">{selectedCity.name}</h2>
                <h2 className="city-rank">
                  {thisYearsBest && `This year's best!`}
                  {!thisYearsBest && isCurrentYear ? `is` : `was`}
                   the {selectedCity.rank} safest driving city <span className="density-line">by Population Density</span><span className="rain-snow-line">in Rain & Snow</span></h2>
              </div>
            </div>
          </Modal>
        }
      </div>
    )
  }
}

TabbedMap.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object,
  selectedState: PropTypes.string
}

export default TabbedMap
