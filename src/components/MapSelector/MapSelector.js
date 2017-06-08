import './style.scss'
import 'react-select/dist/react-select.css'
import {US_STATES, YEARS} from 'constants/maps'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import _ from 'lodash/fp'

const MapSelector = class MapSelector extends React.Component {
  constructor (props) {
    super(props)
    this.getStates = this.getStates.bind(this)
    this.handleMapSelectorChange = this.handleMapSelectorChange.bind(this)
    this.handleYearOptionChange = this.handleYearOptionChange.bind(this)
    this.handleStateOptionChange = this.handleStateOptionChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  handleYearOptionChange (option) {
    this.props.onYearOptionSelect(option.value)
  }

  getStates (locations) {
    const states = _.flow([
      _.map('State'),
      _.uniq,
      _.reduce((result, value) => {
        if (!result[value]) {
          result.push({
            id: value,
            name: US_STATES[value]
          })
        }
        return result
      }, []),
      _.sortBy(pair => pair.name)
    ])(locations)
    return states
  }

  handleStateOptionChange (option) {
    this.props.onStateOptionSelect(option.value)
  }

  clearSearch (e) {
    e.preventDefault()
    this.props.onMapSelect()
  }
  handleMapSelectorChange (e) {
    e.stopPropagation()
    let {selectedYearOption, selectedStateOption} = this.props
    const newMap = _.extend(this.props.selectedMap, {
      year: selectedYearOption,
      stateFilter: selectedStateOption
    })
    this.props.onMapSelect(newMap)
  }

  render () {
    let {selectedMap, defaultYear, selectedYearOption, selectedStateOption, errorMessage} = this.props
    const safeCityData = selectedMap.safeCityData
    const years = _.map(year => ({
      label: year,
      value: year
    }), YEARS)
    const usStates = [
      {label: 'All', value: ''}
    ].concat(_.map(usState => ({
      label: usState.name,
      value: usState.id
    }), US_STATES))

    return (
      <div styleName="container">
        <div styleName="selector-container">
          {/* <div styleName="year-select"> */}
            <label styleName="year-label" htmlFor="year">Year</label>
            <Select
              id="year"
              className="select-box year"
              value={selectedYearOption}
              options={years}
              onChange={this.handleYearOptionChange}
              clearable={false}
            />

            <label styleName="state-label" htmlFor="usState">State</label>
            <Select
              className="select-box usState"
              id="usState"
              value={selectedStateOption}
              options={usStates}
              onChange={this.handleStateOptionChange}
              clearable={false}
            />

          <button type="button" onClick={this.handleMapSelectorChange}>Go</button>
        </div>
        <div styleName={`clear-search-container ${errorMessage !== '' ? 'has-error' : ''}`}>
          {errorMessage === '' && safeCityData.safeCityCount > 0 && <div styleName="factoid"><span styleName="state-name">{safeCityData.name}</span> has <span styleName="safe-city-count">{safeCityData.safeCityCount}</span> of the top 200 safest driving cities.</div>}
          {errorMessage !== '' && <div styleName="error">{errorMessage}</div>}
          {(errorMessage || safeCityData.safeCityCount > 0 || selectedMap.year !== defaultYear) &&
            <div styleName="clear-search">
              <a href="#" onClick={this.clearSearch}>Clear search</a>
            </div>}
        </div>
      </div>
    )
  }
}

MapSelector.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  onMapSelect: PropTypes.func.isRequired,
  onFilterState: PropTypes.func.isRequired,
  defaultYear: PropTypes.string.isRequired,
  selectedYearOption: PropTypes.string.isRequired,
  onYearOptionSelect: PropTypes.func.isRequired,
  selectedStateOption: PropTypes.string.isRequired,
  onStateOptionSelect: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
  // mapSelector: PropTypes.shape({
  //   year: PropTypes.object,
  //   usState: PropTypes.object
  // }).isRequired,
  // onMapSelectorChange: PropTypes.func.isRequired
}
export default MapSelector
