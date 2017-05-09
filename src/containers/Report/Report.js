import { connect } from 'react-redux'
import { selectMap, selectYear, selectCity } from 'redux/actions'
import TabbedMap from 'components/TabbedMap'


const mapStateToProps = (state) => {
  console.log('Report::mapStateToProps state', state, 'args', arguments)
  return {
    selectedMap: state.selectedMap,
    selectedYear: state.selectedYear,
    selectedCity: state.selectedCity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTabClick: (selectedMap) => {
      // console.log('onTabClick dispatch', selectedMap)
      dispatch(selectMap(selectedMap))
    },
    onYearChange: (selectedYear) => {
      dispatch(selectYear(selectedYear))
    },
    onCityChange: (selectedCity) => {
      dispatch(selectCity(selectedCity))
    }
  }
}

const Report = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedMap)

export default Report

