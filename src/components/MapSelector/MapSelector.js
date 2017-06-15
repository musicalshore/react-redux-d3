import './style.scss'
import 'react-select/dist/react-select.css'

import {DEFAULT_MAP, DEFAULT_YEAR, USA_STATES, TOP_CITY, YEARS} from 'constants/maps'
import {func, object, string} from 'prop-types'

import React from 'react'
import Select from 'react-select'
import _ from 'lodash/fp'

const MapSelector = class MapSelector extends React.Component {
  static propTypes = {
    error: object,
    optionYear: string.isRequired,
    optionUSAState: string.isRequired,
    selectedMap: string.isRequired,
    selectedYear: string.isRequired,
    selectedUSAState: object,
    onMapSelect: func.isRequired,
    onYearOption: func.isRequired,
    onUSAStateOption: func.isRequired
  }
  handleYearOptionChange = (option) => {
    console.log('handleYearOptionChange: ', option)
    this.props.onYearOption(option.value)
  }

  getStates = (locations) => {
    const states = _.flow([
      _.map('state'),
      _.uniq,
      _.reduce((result, value) => {
        if (!result[value]) {
          result.push({
            id: value,
            name: USA_STATES[value]
          })
        }
        return result
      }, []),
      _.sortBy(pair => pair.name)
    ])(locations)
    return states
  }

  handleStateOptionChange = (option) => {
    this.props.onUSAStateOption(option.value)
  }

  clearSearch = (e) => {
    e.preventDefault()
    this.props.onMapSelect({id: DEFAULT_MAP, year: DEFAULT_YEAR})
  }

  handleMapSelectorChange = (e) => {
    e.preventDefault()
    this.props.onMapSelect({
      id: this.props.selectedMap,
      year: this.props.optionYear,
      USAStateId: this.props.optionUSAState
    })
  }

  render () {
    const {selectedMap, selectedYear, optionYear, optionUSAState, error, selectedUSAState} = this.props
    console.log('this.props: ', this.props)
    const USAStateName = _.getOr('', 'name', selectedUSAState)
    const totalSafeCities = _.getOr(0, 'totalSafeCities', selectedUSAState)
    const errorMessage = _.getOr('', 'message', error)
    console.log('errorMessage: ', errorMessage)
    const years = _.map(year => ({
      label: year,
      value: year
    }), YEARS)
    const USAStates = [{
      label: 'All',
      value: ''
    }].concat(_.map(USAState => ({
      label: USAState.name,
      value: USAState.id
    }), USA_STATES))

    return (
      <div styleName="container">
        <div styleName="selector-container">
          <label styleName="year-label" htmlFor="abdYear">Year</label>
          <Select
            name="abdYear"
            className="select-box year"
            value={optionYear}
            options={years}
            onChange={this.handleYearOptionChange}
            clearable={false}
          />
          <label styleName="state-label" htmlFor="abdState">State</label>
          <Select
            className="select-box usState"
            name="abdState"
            value={optionUSAState}
            options={USAStates}
            onChange={this.handleStateOptionChange}
            clearable={false}
          />
          <button type="button" onClick={this.handleMapSelectorChange}>Go</button>
        </div>
        <div styleName={`clear-search-container ${errorMessage !== '' ? 'has-error' : ''}`}>
          <If condition={selectedMap === TOP_CITY && (!errorMessage && !!totalSafeCities && !!USAStateName)}>
            <div styleName="factoid">
              <span styleName="state-name">{USAStateName}</span> has <span styleName="safe-city-count">{totalSafeCities}</span> of the top 200 safest driving cities.</div>
          </If>
          <If condition={!!errorMessage || !!USAStateName || selectedYear !== DEFAULT_YEAR }>
            <If condition={!!errorMessage}>
              <div styleName="error">{errorMessage}</div>
            </If>
            <div styleName="clear-search">
              <a href="#" onClick={this.clearSearch}>Clear search</a>
            </div>
          </If>

        </div>
      </div>
    )
  }
}

export default MapSelector
