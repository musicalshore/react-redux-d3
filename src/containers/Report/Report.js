import { optionUSAState, optionYear, selectCity, selectMap, toggleModal } from 'redux/actions'

import TabbedMap from 'components/TabbedMap'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    error: state.error,
    locations: state.locations,
    modalIsOpen: state.modalIsOpen,
    optionUSAState: state.optionUSAState,
    optionYear: state.optionYear,
    selectedCity: state.selectedCity,
    selectedMap: state.selectedMap,
    selectedUSAState: state.selectedUSAState,
    selectedYear: state.selectedYear
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMapSelect: ({id, year, USAStateId = ''}) => {
      dispatch(selectMap({id, year, USAStateId}))
    },
    onCitySelect: (cityState) => {
      dispatch(selectCity(cityState))
    },
    onYearOption: (year) => {
      dispatch(optionYear(year))
    },
    onUSAStateOption: (id) => {
      dispatch(optionUSAState(id))
    },
    onToggleModal: () => {
      dispatch(toggleModal())
    }
  }
}

const Report = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedMap)

export default Report
