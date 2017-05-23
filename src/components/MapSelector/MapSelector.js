import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {YEARS, US_STATES} from 'constants/maps'
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
    this.state = {
      selectedYear: this.props.selectedMap.year,
      selectedState: this.props.selectedMap.stateFilter ? this.props.selectedMap.stateFilter : 'All'
    }
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
  handleYearChange (event) {
    this.setState({selectedYear: event.target.value})
  }
  componentWillReceiveProps (nextProps) {
  console.log("componentWillReceiveProps ", nextProps);

  }
  handleStateChange (event) {
    let newState = _.extend({}, {selectedState: event.target.value})

    let {selectedMap} = this.props
    if (event.target.value !== 'All') {
      let pair = _.find(['id', event.target.value], this.getStates(selectedMap.mapData.markers))
      let safeCityCount = _.size(_.filter(['State', pair.id], selectedMap.mapData.markers))
      newState = _.extend(newState, {
        safeCityCount: safeCityCount,
        selectedStateName: pair.name
      })
    }
    console.log('handleStateChange', newState)
    this.setState(newState)
  }
  componentDidUpdate () {

  }
  handleClick () {
    const newMap = _.extend(this.props.selectedMap, {
      year: this.state.selectedYear,
      stateFilter: this.state.selectedState
    })
    console.log('newMap', newMap);

    this.props.onMapSelect(newMap)
  }
  render () {
    let {selectedMap} = this.props
    const years = _.map(year => <option key={year} value={year}>{year}</option>, YEARS)
    const usStates = _.map(pair => <option key={pair.id} value={pair.id}>{pair.name}</option>, this.getStates(selectedMap.mapData.markers))


    return (
      <div styleName="container">
        <div styleName="selector-container">
          <label htmlFor="year">Year</label>
          <div styleName="select-box year">
            <select value={this.state.selectedYear} onChange={this.handleYearChange}>
              {years}
            </select>
          </div>
          <label styleName="state-label" htmlFor="usState">State</label>
          <div styleName="select-box state">
            <select id="usState" value={this.state.selectedState} onChange={this.handleStateChange}>
              <option value="All">All</option>
              {usStates}
            </select>
          </div>
          <button type="button" onClick={this.handleClick}>Go</button>
        </div>
        {/*<div styleName="clear-search-container">
          {this.state.safeCityCount && this.state.selectedStateName && <div styleName="factoid"><span styleName="state-name">{this.state.selectedStateName}</span> has <span styleName="safe-city-count">{this.state.safeCityCount}</span> of the top 200 safest driving cities.</div>}
          <div styleName="clear-search">Clear search</div>
        </div>*/}
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
  selectedMap: PropTypes.object.isRequired
}
export default MapSelector
