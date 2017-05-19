import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import MapSelector from 'components/MapSelector'
import TabNav from 'components/TabNav'
import Map from 'containers/Map'
import TopListings from 'components/TopListings'
import {CURRENT_YEAR, TOP_CITY} from 'constants/maps'
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
const CityModalHeading = (props) => {
  let {selectedCity, selectedMap, closeModal} = props
  let message
  const verb = selectedMap.year === CURRENT_YEAR ? 'is' : 'was'
  const rankingType = selectedMap.id !== TOP_CITY ? ` by ${selectedMap.rankingType}` : ''

  if (selectedCity.rank === 1 && selectedMap.year === CURRENT_YEAR) {
    message = <span>This year's best!</span>
  } else {
    message = <span>{verb} the <b>{selectedCity.rank}</b> safest driving city in <b>{selectedMap.year}</b>{rankingType}.</span>
  }
  return (
    <div>
      <h2 className="city-name">{selectedCity.cityState}</h2>
      <div className="close" onClick={closeModal} />
      <div className="city-rank">{message}</div>
    </div>
  )
}

const Rankings = (props) => {
  let {selectedCity, selectedMap} = props
  console.log('______selectedCity',selectedCity, selectedMap);
  const populationDensity = selectedCity[`${selectedMap.year} Population Density`]
  const rainSnow = selectedCity[`${selectedMap.year} Rain & Snow`]
  const lastYearsRanking = selectedCity[`${parseInt(selectedMap.year) - 1} Top Cities`]
  return (
    <div>
      <h5>{selectedMap.year} data</h5>
      <div>Overall Ranking <span>{selectedCity.rank}</span></div>
      {populationDensity &&
        <div>Population Density <span>{populationDensity}</span></div>
      }
      {rainSnow &&
        <div>Rain & Snow <span>{rainSnow}</span></div>
      }
      {lastYearsRanking &&
        <div>{parseInt(selectedMap.year) - 1} Ranking <span>{lastYearsRanking}</span></div>
      }
    </div>
  )
}
const CityData = (props) => {
  let {selectedCity, selectedMap} = props
  const yearsBetweenClaims = selectedCity[`${selectedMap.year} Average Years Between Accidents`]
  const breakingEvents = selectedCity[`${selectedMap.year} Braking Events per 1000 Miles (city)`]
  if (!yearsBetweenClaims && !breakingEvents) {
    return <div/>
  }
  return (
    <div>
      <h5>City data</h5>
      <div>{selectedCity.cityState}</div>
      {yearsBetweenClaims &&
        <div>Years between claims<sup>1</sup>: <span>{yearsBetweenClaims}</span></div>
      }
      {breakingEvents &&
        <div>Drivewise<sup>®</sup> breaking events per 1,000 miles<sup>2</sup>: <span>{breakingEvents}</span></div>
      }
    </div>
  )
}
const SuburbanData = (props) => {
  let {selectedCity, selectedMap} = props
  const yearsBetweenClaims = selectedCity[`${selectedMap.year} Years Between Accidents (Suburban Area only)`]
  const breakingEvents = selectedCity[`${selectedMap.year} Suburban Braking Events per 1000 Miles`]
  if (!yearsBetweenClaims && !breakingEvents) {
    return <div/>
  }
  return (
    <div>
      <h5>Suburban Metro Area data</h5>
      <div>{selectedCity.metropolitanArea}</div>
      {yearsBetweenClaims &&
        <div>Years between claims<sup>1</sup>: <span>{yearsBetweenClaims}</span></div>
      }
      {breakingEvents &&
        <div>Drivewise<sup>®</sup> breaking events per 1,000 miles<sup>2</sup>: <span>{breakingEvents}</span></div>
      }
    </div>
  )
}
const CityModal = (props) => {
  let {selectedCity, selectedMap} = props
  return (
    <div className={`modal-container ${_.kebabCase(selectedMap.id)}`}>
      <div className="city-container">
        <CityModalHeading {...props} />
        <Rankings {...props} />
        <div>
          <CityData {...props} />
          <SuburbanData {...props} />
        </div>
      </div>
    </div>
  )
}
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
    let {selectedCity, selectedMap} = this.props
 console.log("selectedCity, selectedMap ", selectedCity, selectedMap);
    if (!prevProps.selectedCity && selectedCity && !this.state.modalIsOpen) {
      // const marker = _.find(['cityState', selectedCity.cityState], selectedMap.mapData.markers)
      // this.setState({selectedMarker: marker})
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
    let {selectedMap, selectedCity, selectedState, onMapSelect, onCitySelect} = this.props

    let isCurrentYear = selectedMap.year === CURRENT_YEAR
    let isBest = selectedCity !== null && selectedCity.rank === 1
  console.log("selectedCity ", selectedCity);
    let thisYearsBest = isCurrentYear && isBest

    return (
      <div styleName="container">
        <MapSelector selectedMap={selectedMap} onMapSelect={onMapSelect} />
        <div styleName="map-container">
          <div styleName="maps">
            <TabNav selectedMap={selectedMap} onTabClick={onMapSelect} />
            <Map width="715" height="625" />
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
            <TopListings onCitySelect={onCitySelect} selectedMap={selectedMap} selectedCity={selectedCity} />
          </div>
        </div>
        { selectedCity !== null && selectedCity.rank &&
          <Modal isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            contentLabel="City Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <CityModal {...this.props} closeModal={this.closeModal} />
          </Modal>
        }
      </div>
    )
  }
}

TabbedMap.propTypes = {
  onMapSelect: PropTypes.func.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object
}

CityModal.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

CityModalHeading.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

Rankings.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}
CityData.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}

SuburbanData.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}

export default TabbedMap
