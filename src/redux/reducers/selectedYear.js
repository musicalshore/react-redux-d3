import {SELECT_MAP} from 'constants/actionTypes'
import {DEFAULT_YEAR} from 'constants/maps'
import initialState from 'redux/initialState'

const selectedYear = (state = initialState.selectedYear, action) => {
  switch (action.type) {
    case SELECT_MAP:
      return !action.year ? DEFAULT_YEAR : action.year
    default:
      return state
  }
}

export default selectedYear
