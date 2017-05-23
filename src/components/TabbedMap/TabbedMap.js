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

function ordinal (n, sup = false) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  const suffix = (s[(v - 20) % 10] || s[v] || s[0])
  if (sup) {
    return <span>{n}<sup>{suffix}</sup></span>
  } else {
    return <span>{n}{suffix}</span>
  }
}

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
const CityModalHeading = (props) => {
  let {selectedCity, selectedMap, closeModal} = props
  let message = ''
  let additionalClasses = ''

  const verb = selectedMap.year === CURRENT_YEAR ? 'is' : 'was'
  const rankingType = selectedMap.id !== TOP_CITY ? ` by ${selectedMap.rankingType}` : ''

  if (selectedCity.rank === 1 && selectedMap.year === CURRENT_YEAR) {
    additionalClasses += 'badge this-years-best'
    message = <span>This year&apos;s best!</span>
  } else if (selectedCity.mostImproved) {
    additionalClasses += 'badge most-improved'
    message = <span>Most improved!</span>
  } else if (selectedCity.newLocation) {
    additionalClasses += 'badge new-location'
    message = <span>This year&apos;s best!</span>
  } else {
    additionalClasses += 'no-badge'
    message = <span>{verb} the <b>{ordinal(selectedCity.rank, true)}</b> safest driving city in <b>{selectedMap.year}</b>{rankingType}.</span>
  }

  return (
    <div className={`city-modal-heading-container ${additionalClasses}`}>
      <div>
        <h2 className="city-name">{selectedCity.cityState}</h2>
        <div className="city-rank">{message}</div>
      </div>
      <div className="close" onClick={closeModal}>
        <div>Close</div><div className="times">&times;</div>
      </div>
    </div>
  )
}

const Rankings = (props) => {
  let {selectedCity, selectedMap} = props
  // console.log('______selectedCity',selectedCity, selectedMap);
  const populationDensity = selectedCity[`${selectedMap.year} Population Density`]
  const rainSnow = selectedCity[`${selectedMap.year} Rain & Snow`]
  const lastYearsRanking = selectedCity[`${parseInt(selectedMap.year) - 1} Top Cities`]
  let arrow = 'arrow'
  if (selectedCity.rank < lastYearsRanking) {
    arrow += ' up'
  } else if (selectedCity.rank > lastYearsRanking) {
    arrow += ' down'
  }
  return (
    <div className="rankings-container">
      <h5>{selectedMap.year} data</h5>
      <div className="overall-ranking">
        <span>Overall Ranking</span>
        <span className={arrow} /><span className="rank">{ordinal(selectedCity.rank, true)}</span></div>
      {populationDensity &&
        <div className="population-ranking"><span>Population Density</span><span className="rank">{ordinal(populationDensity, true)}</span></div>
      }
      {rainSnow &&
        <div className="rain-snow-ranking"><span>Rain & Snow</span><span className="rank">{ordinal(rainSnow, true)}</span></div>
      }
      {lastYearsRanking &&
        <div className="last-years-ranking"><span>{parseInt(selectedMap.year) - 1} Ranking</span><span className="rank">{ordinal(lastYearsRanking, true)}</span></div>
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
    <div className="city-data-container">
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
    <div className="suburban-data-container">
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
const Footnotes = () => {
  return (
    <div className="footnotes-container">
      <div><sup>1</sup>National average: 10</div>
      <div><sup>2</sup>National average: 19</div>
    </div>
  )
}
const CityModal = (props) => {
  let {selectedMap} = props
  return (
    <div className={`city-modal-container ${_.kebabCase(selectedMap.id)}`}>
      <CityModalHeading {...props} />
      <Rankings {...props} />
      <div className="additional-data">
        <CityData {...props} />
        <SuburbanData {...props} />
      </div>
        <Footnotes />
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
    let {selectedCity} = this.props
    if (!prevProps.selectedCity && selectedCity && !this.state.modalIsOpen) {
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
    let {selectedMap, selectedCity, onMapSelect, onCitySelect} = this.props

    return (
      <div styleName="container">
        <MapSelector selectedMap={selectedMap} onMapSelect={onMapSelect} />
        <div styleName="map-container">
          <div styleName="maps">
            <TabNav selectedMap={selectedMap} onTabClick={onMapSelect} />
            <Map width="715" height="625" />
            {/*<div styleName="timeLine-SocialContainer">

              <div styleName="socialContainer">
                <div id="pageShare"></div>
              </div>
            </div>*/}
          </div>
          <div styleName="top-listings">
            <TopListings onCitySelect={onCitySelect} selectedMap={selectedMap} selectedCity={selectedCity} />
          </div>
        </div>
        <Legend />
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
