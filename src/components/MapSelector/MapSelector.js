import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {YEARS, US_STATES} from 'constants/maps'

const MapSelector = class MapSelector extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedYear: this.props.selectedMap.year,
      selectedState: this.props.selectedState
    }
  }
  handleClick () {
    // if (this.state.selectedYear && !!this.state.selectedState) {
    //   this.state.sel
    // }
    //   this.props

  }
  render () {
    let { selectedState, onYearChange, onStateChange} = this.props
    const years = _.map(year => <option key={year} value={year}>{year}</option>, YEARS)
    const usStates = _.map(pair => <option key={pair[0]} value={pair[0]}>{pair[1]}</option>, _.toPairs(US_STATES))
    return (
      <div styleName="container">
        <label>
          Year
          <select value={this.state.selectedYear}>
            {years}
          </select>
        </label>
        <label>
          State
          <select value={this.state.selectedState}>
            <option value=""></option>
            {usStates}
          </select>
        </label>
        <button type="button" disabled={!this.state.selectedYear || !this.state.selectedState} styleName="button" onClick={this.handleClick}>Go</button>
      </div>
    )
  }
}

MapSelector.propTypes = {
  onYearChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  selectedState: PropTypes.string
}
export default MapSelector
