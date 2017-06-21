import _ from 'lodash/fp'
import React from 'react'
import {GOOGLE_API_KEY} from 'constants/maps'
import {string} from 'prop-types'
import './style.scss'
import {Ordinal, getLocationsByYear, getPosition} from 'utils/utils'

const uri = `https://maps.googleapis.com/maps/api/geocode/json`

async function fetchGeocode (service) {
  let json
  try {
    const res = await fetch(service)
    json = await res.json()
  } catch (e) {
    console.warn(`Unable to connect to geocode service. ${service}`, e.message)
    return
  }
  if (json.status !== 'OK' || !json.results.length) {
    console.warn('Geocode service returned bad data. ', json)
    return
  }
  console.log('results: ', json.results)
  return json.results[0]
}

function getCityStateFromAddress (address) {
  let cityState
  let city
  let state
  try {
    [cityState, city, state] = address.match(/^([\w-\s]+),\s+([A-Z]{2})/)
  } catch (e) {
    console.warn('Could not extract city and state from "formatted_address": ', e.message)
    return
  }
  return `${city}, ${state}`
}
async function fetchCityStateByZipcode (zipcode) {
  const service = `${uri}?components=country:US|postal_code:${zipcode}&key=${GOOGLE_API_KEY}`
  const result = await fetchGeocode(service)
  const cityState = getCityStateFromAddress(result.formatted_address)
  return cityState
}

async function fetchCityStateFromGeolocation () {
  let position
  try {
    position = await getPosition()
  } catch (e) {
    console.warn(e.message)
    return
  }
  const latlng = `${position.coords.latitude},${position.coords.longitude}`
  const service = `${uri}?latlng=${latlng}&result_type=locality&key=${GOOGLE_API_KEY}`
  const result = await fetchGeocode(service)
  // console.log('result: ', result)

  return getCityStateFromAddress(result.formatted_address)
}

const LocalCity = class LocalCity extends React.Component {
  static propTypes = {
    selectedYear: string.isRequired,
    cityState: string
  }
  state = {
    cityState: '',
    zipcode: '',
    rank: 0,
    editing: false
  }
  constructor () {
    super()
    this.save = this.save.bind(this)
  }
  getRankByCityStateAndYear = (cityState, year) => {
    const locations = getLocationsByYear(year)
    if (_.isEmpty(locations)) {
      console.warn(`Unable to find locations for ${year}.`)
      return -1
    }
    const location = _.find(['cityState', cityState], locations)
    if (!location) {
      console.warn(`Unable to find "${cityState}" in location data for ${year}.`)
      return -1
    }
    const rank = _.get('rankings.Top Cities', location)
    if (!rank || rank < 1) {
      console.warn(`Unable to find "${year} Top Cities" rank for ${cityState}" in location data.`)
      return -1
    }
    return rank
  }
  async componentDidMount () {
    const {selectedYear} = this.props
    let cityState
    let zipcode = localStorage.getItem('LocalAgentsZip')
    if (localStorage && zipcode) {
      cityState = await fetchCityStateByZipcode(zipcode)
      this.setState({
        zipcode,
        cityState,
        rank: this.getRankByCityStateAndYear(cityState, selectedYear)
      })
    } else if (this.props.cityState) {
      this.setState({
        cityState: this.props.cityState,
        rank: this.getRankByCityStateAndYear(this.props.cityState, selectedYear)
      })
    } else {
      cityState = await fetchCityStateFromGeolocation()
      this.setState({
        cityState: cityState,
        rank: this.getRankByCityStateAndYear(cityState, selectedYear)

      })
    }
  }
  edit = () => {
    this.setState({
      editing: true
    })
  }
  handleChange = (e) => {
    this.setState({zipcode: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      cityState: '',
      rank: 0
    })
    this.save()
  }
  async save () {
    const {selectedYear} = this.props
    let cityState
    let rank
    let zipcode
    if (this.state.zipcode && this.state.zipcode.length === 5) {
      zipcode = this.state.zipcode
      cityState = await fetchCityStateByZipcode(zipcode)
      rank = this.getRankByCityStateAndYear(cityState, selectedYear)
      if (localStorage) {
        localStorage.setItem('LocalAgentsZip', zipcode)
      }
    } else {
      cityState = ''
      rank = 0
    }
    this.setState({
      editing: false,
      cityState,
      zipcode,
      rank
    })
  }

  componentWillReceiveProps (nextProps) {
    let {selectedYear} = this.props
    if (selectedYear !== nextProps.selectedYear) {
      this.setState({
        rank: this.getRankByCityStateAndYear(this.state.cityState, nextProps.selectedYear)
      })
    }
  }
  getZipcodeRef = (el) => { this.zipcodeRef = el }
  render () {
    return (
      <div styleName="local-city-container">
        {((this.state.cityState && this.state.rank) || this.state.rank === -1) &&
          <div>
            <div styleName="local-city">
              <If condition={this.state.editing}>
                <form onSubmit={this.handleSubmit}>
                  <input ref={this.getZipcodeRef} type="text" styleName="zipcode-field" onChange={this.handleChange} aria-label="enter zipcode" value={this.state.zipcode} maxLength={5} /><button styleName="save-zipcode-button" type="button" aria-label="save zipcode" onClick={this.save}>(save)</button>
                </form>
              </If>

              <If condition={!this.state.editing}>
                <div>
                  <If condition={this.state.cityState && this.state.cityState !== ''}>
                    <If condition={this.state.rank === -1}>
                      <div styleName="no-location-data">Your city is not ranked.</div>
                    </If>
                    <If condition={this.state.rank > 0}>
                      <span styleName="city-state">{this.state.cityState}</span>
                    </If>
                  </If>
                  <If condition={!this.state.cityState || this.state.rank === -1 }>
                    <label htmlFor="editZipcodeButton" styleName="enter-zip-code">ZIP code</label>
                  </If>
                  <button id="editZipcodeButton" onClick={this.edit} styleName="edit-zipcode-button" type="button" aria-label="edit zipcode">(edit)</button>
                </div>
              </If>
            </div>
            <div styleName="local-city-rank">
              <If condition={!this.state.editing && this.state.rank && this.state.rank > 0}>
                  is the <Ordinal number={this.state.rank} sup={true} /> safest driving city.
              </If>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default LocalCity
