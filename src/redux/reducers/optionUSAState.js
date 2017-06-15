import {OPTION_USA_STATE, SELECT_MAP} from 'constants/actionTypes'

import initialState from 'redux/initialState'

const optionUSAState = (state = initialState.optionUSAState, action) => {
  switch (action.type) {
    case OPTION_USA_STATE:
      return action.id
    case SELECT_MAP:
      return action.USAStateId
    default:
      return state
  }
}

export default optionUSAState
