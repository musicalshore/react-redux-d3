import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {YEARS, US_STATES} from 'constants/maps'

const MapSelector = class MapSelector extends React.Component {
  constructor (props) {
    super(props)
    this.getStates = this.getStates.bind(this)
    this.handleMapSelectorChange = this.handleMapSelectorChange.bind(this)
    this.handleYearOptionChange = this.handleYearOptionChange.bind(this)
    this.handleStateOptionChange = this.handleStateOptionChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    // this.updateStateInfo = this.updateStateInfo.bind(this)
  }

  handleYearOptionChange (e) {
    this.props.onYearOptionSelect(e.target.value)
    e.stopPropagation()
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


  // updateStateInfo ({year, usState}) {
  //   const stateFilter = selectedMap.stateFilter
  //   let safeCityCount
  //   let selectedStateName

  //   if (stateFilter !== '') {
  //     selectedStateName = _.get('name', _.find(['id', stateFilter], US_STATES))

  //     safeCityCount = _.size(_.filter(['State', stateFilter], selectedMap.mapData.markers))
  //   }
  //   this.setState({
  //     stateFilter,
  //     safeCityCount,
  //     selectedStateName,
  //     selectedYear: selectedMap.year
  //   })
  // }
  handleStateOptionChange (e) {
    this.props.onStateOptionSelect(e.target.value)
    e.stopPropagation()
    // let stateFilter = event.target.value
    // this.setState({
    //   stateFilter
    // })
    // this.props.onFilterState(stateFilter)
  }
  // shouldComponentUpdate (nextProps) {
  //   return !_.isEqual(nextProps.mapSelector, this.props.mapSelector)
  // }
  // componentWillReceiveProps (nextProps) {
  //   let {selectedMap} = this.props
  //   if (!_.isEqual(nextProps.mapSelector, this.props.mapSelector)) {
  //     if (!_)
  //   }
  //   if ((nextProps.selectedStateOption))
  //   if ((nextProps.selectedMap.stateFilter !== selectedMap.stateFilter) ||
  //   (nextProps.selectedMap.year !== selectedMap.year) ||
  //   (nextProps.selectedMap.id !== nextProps.selectedMap.id)) {
  //     this.updateStateInfo(nextProps.selectedMap)
  //   }
  // }
  clearSearch (e) {
    e.preventDefault()
    this.props.onMapSelect()
  }
  handleMapSelectorChange (e) {
    e.stopPropagation()
    let {selectedYearOption, selectedStateOption} = this.props
    // if (selectedStateOption !== '') {
    const newMap = _.extend(this.props.selectedMap, {
      year: selectedYearOption,
      stateFilter: selectedStateOption
    })
    this.props.onMapSelect(newMap)
    // this.props.onMapSelectorChange({
    //   selectedYearOption,
    //   selectedStateOption
    // })
    // const newMap = _.extend(this.props.selectedMap, {
    //   year: this.state.selectedYear,
    //   stateFilter: this.state.stateFilter
    // })
    // this.props.onMapSelect(newMap)
  }
  render () {
    let {selectedMap, defaultYear, selectedYearOption, selectedStateOption, errorMessage} = this.props
    const safeCityData = selectedMap.safeCityData

    const years = _.map(year => <option key={year} value={year}>{year}</option>, YEARS)
    const usStates = _.map(usState => <option key={usState.id} value={usState.id}>{usState.name}</option>, US_STATES)
    return (
      <div styleName="container">
        <div styleName="selector-container">
          {/*<div styleName="year-select">*/}
            <label styleName="year-label" htmlFor="year">Year</label>
            <div styleName="select-box year">
              <select id="year" value={selectedYearOption} onChange={this.handleYearOptionChange}>
                {years}
              </select>
            </div>
          {/*</div>*/}
          {/*<div styleName="state-select">*/}
            <label styleName="state-label" htmlFor="usState">State</label>
            <div styleName="select-box state">
              <select id="usState" value={selectedStateOption} onChange={this.handleStateOptionChange}>
                <option key="ALL" value="">All</option>
                {usStates}
              </select>
            </div>
          {/*</div>*/}
          <button type="button" onClick={this.handleMapSelectorChange}>Go</button>
        </div>
        <div styleName="clear-search-container">
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
