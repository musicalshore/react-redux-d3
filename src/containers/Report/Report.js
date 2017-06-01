import _ from 'lodash/fp'
import { connect } from 'react-redux'
import { selectMap, selectCity, filterState, selectYearOption, selectStateOption } from 'redux/actions'
import TabbedMap from 'components/TabbedMap'

const mapDispatchToProps = (dispatch) => {
  return {
    onMapSelect: (selectedMap) => {
      // console.log('onTabClick dispatch', selectedMap)
      dispatch(selectMap(selectedMap))
    },
    onCitySelect: (selectedCity = null) => {
      dispatch(selectCity(selectedCity))
    },
    onFilterState: (stateFilter) => {
      dispatch(filterState(stateFilter))
    },
    onYearOptionSelect: (selectedYearOption) => {
      dispatch(selectYearOption(selectedYearOption))
    },
    onStateOptionSelect: (selectedStateOption) => {
      dispatch(selectStateOption(selectedStateOption))
    }
    // onMapSelectorChange: (changedMapSelector) => {
    //   dispatch(changeMapSelector(changedMapSelector))
    // }
  }
}

const Report = connect(
  _.extend({}), // auto-curried function, is passed complete state
  mapDispatchToProps
)(TabbedMap)

export default Report

