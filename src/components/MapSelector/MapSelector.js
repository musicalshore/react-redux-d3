import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {YEARS, US_STATES, CURRENT_YEAR} from 'constants/maps'
// const debug = require('debug')('MapSelector')



/*const ClearSearch = ({selectedState, selectedMap}) => {
  console.log("ClearSearch selectedState, selectedMap ", selectedState, selectedMap)
  return (
    <div styleName="clear-search-container">
      <span
    </div>
  )
  console.log()
}*/
const MapSelector = class MapSelector extends React.Component {
  constructor (props) {
    super(props)
    this.getStates = this.getStates.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.updateState = this.updateState.bind(this)
    this.state = {
      selectedYear: this.props.selectedMap.year,
      stateFilter: this.props.selectedMap.stateFilter
    }
  }

  handleYearChange (event) {
    this.setState({selectedYear: event.target.value})
  }

  getStates (markers) {
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
    ])(markers)
    return states
  }

  updateState (selectedMap) {
    const stateFilter = selectedMap.stateFilter
    let safeCityCount
    let selectedStateName

    if (stateFilter !== '') {
      selectedStateName = _.get('name', _.find(['id', stateFilter], US_STATES))

      safeCityCount = _.size(_.filter(['State', stateFilter], selectedMap.mapData.markers))
    }
    this.setState({
      stateFilter,
      safeCityCount,
      selectedStateName,
      selectedYear: selectedMap.year
    })
  }
  handleStateChange (event) {
    let stateFilter = event.target.value
    this.setState({
      stateFilter
    })
    // this.props.onFilterState(stateFilter)
  }
  componentWillReceiveProps (nextProps) {
    let {selectedMap} = this.props

    if ((nextProps.selectedMap.stateFilter !== selectedMap.stateFilter) ||
    (nextProps.selectedMap.year !== selectedMap.year) ||
    (nextProps.selectedMap.id !== nextProps.selectedMap.id)) {
      this.updateState(nextProps.selectedMap)
    }
  }
  clearSearch (e) {
    e.preventDefault()
    const newMap = _.extend(this.props.selectedMap, {
      year: CURRENT_YEAR,
      stateFilter: ''
    })

    this.props.onMapSelect(newMap)
  }
  handleClick () {
    const newMap = _.extend(this.props.selectedMap, {
      year: this.state.selectedYear,
      stateFilter: this.state.stateFilter
    })
    this.props.onMapSelect(newMap)
  }
  render () {
    let {selectedMap} = this.props
    const years = _.map(year => <option key={year} value={year}>{year}</option>, YEARS)
    const usStates = _.map(pair => <option key={pair.id} value={pair.id}>{pair.name}</option>, US_STATES)
    console.log('this.state.safeCityCount', this.state.safeCityCount)
    return (
      <div styleName="container">
        <div styleName="selector-container">
          {/*<div styleName="year-select">*/}
            <label styleName="year-label" htmlFor="year">Year</label>
            <div styleName="select-box year">
              <select id="year" value={this.state.selectedYear} onChange={this.handleYearChange}>
                {years}
              </select>
            </div>
          {/*</div>*/}
          {/*<div styleName="state-select">*/}
            <label styleName="state-label" htmlFor="usState">State</label>
            <div styleName="select-box state">
              <select id="usState" value={this.state.stateFilter} onChange={this.handleStateChange}>
                <option key="ALL" value="">All</option>
                {usStates}
              </select>
            </div>
          {/*</div>*/}
          <button type="button" onClick={this.handleClick}>Go</button>
        </div>
        <div styleName="clear-search-container">
          {this.state.safeCityCount > 0 && <div styleName="factoid"><span styleName="state-name">{this.state.selectedStateName}</span> has <span styleName="safe-city-count">{this.state.safeCityCount}</span> of the top 200 safest driving cities.</div>}
          {(this.state.safeCityCount > 0 || selectedMap.year !== CURRENT_YEAR) &&
            <div styleName="clear-search">
              <a href="#" onClick={this.clearSearch}>Clear search</a>
            </div>}
        </div>
      </div>
    )
  }
}

// ClearSearch.propTypes = {
//   selectedState: PropTypes.string,
//   selectedMap: PropTypes.object.isRequired
// }
MapSelector.propTypes = {
  onMapSelect: PropTypes.func.isRequired,
  onFilterState: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}
export default MapSelector
