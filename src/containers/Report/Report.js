import { connect } from 'react-redux'
import { selectMap, VectorMaps } from 'actions'
import TabbedMap from 'components/TabbedMap'

const getSelectedMap = (selectedMap) => {
  console.log('getSelectedMap', selectedMap)
  switch (selectedMap.id) {
    case 'density':
      return VectorMaps.density
    case 'rain-snow':
      return VectorMaps.rainSnow
    case 'top-city':
    default:
      return VectorMaps.topCity
  }
}
const getSelectedYear = (selectedYear) => {
  switch (selectedYear) {
    default:
      return '2016'
  }
}
const mapStateToProps = (state) => {
  console.log('Report::mapStateToProps state', state, 'args', arguments)
  return {
    selectedMap: getSelectedMap(state.selectedMap),
    selectedYear: getSelectedYear(state.selectedYear)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTabClick: (selectedMap) => {
      // console.log('onTabClick dispatch', selectedMap)
      dispatch(selectMap(selectedMap))
    }
  }
}

const Report = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedMap)

export default Report

