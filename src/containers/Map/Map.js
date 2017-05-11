import { connect } from 'react-redux'
import _ from 'lodash/fp'
import VectorMap from 'components/VectorMap'
import { selectCity } from 'redux/actions'

// const mapStateToProps = (state) => {
//   return _.extend(state, {mapData: getMapData(state)})
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (selectedCity) => {
      dispatch(selectCity(selectedCity))
    }
  }
}

const Map = connect(
  null,
  mapDispatchToProps
)(VectorMap)

export default Map

