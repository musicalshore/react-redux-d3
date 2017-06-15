import {OPTION_YEAR, SELECT_MAP} from 'constants/actionTypes'

import initialState from 'redux/initialState'

const optionYear = (state = initialState.optionYear, action) => {
  switch (action.type) {
    case OPTION_YEAR:
      return action.year
    case SELECT_MAP:
      return action.year
    default:
      return state
  }
}

export default optionYear
