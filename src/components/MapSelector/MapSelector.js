import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import bestDriverLocations from 'best-driver.json'
import {YEARS, US_STATES} from 'constants/maps'

const MapSelector = class MapSelector extends React.Component {
  render () {
    let {selectedYear, selectedState, onYearChange, onStateChange} = this.props
    const years = _.map(year => <option key={year} value={year}>{year}</option>, YEARS)
    const usStates = _.map(pair => <option key={pair[0]} value={pair[0]}>{pair[1]}</option>, _.toPairs(US_STATES))
    return (
      <div styleName="container">
        <label>
          Year
          <select value={selectedYear} onChange={e => onYearChange(e.target.value)}>
            {years}
          </select>
        </label>
        <label>
          State
          <select value={selectedState} onChange={onStateChange}>
            <option value=""></option>
            {usStates}
          </select>
        </label>
        <button styleName="button">Go</button>
      </div>
    )
  }
}

MapSelector.propTypes = {
  onYearChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedState: PropTypes.string
}
export default MapSelector
