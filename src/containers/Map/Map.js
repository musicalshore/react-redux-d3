import { connect } from 'react-redux'
import _ from 'lodash/fp'
import Choropleth from 'components/Choropleth'
import { selectCity } from 'redux/actions'

const mapStateToProps = (state) => {
  return {
    selectedMap: state.selectedMap,
    defaultYear: state.defaultYear,
    selectedCity: state.selectedCity,
    modalIsOpen: state.modalIsOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (selectedCity) => {
      dispatch(selectCity(selectedCity))
    }
  }
}

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(Choropleth)

export default Map

