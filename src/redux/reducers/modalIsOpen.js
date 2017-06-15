import {TOGGLE_MODAL} from 'constants/actionTypes'
import initialState from 'redux/initialState'

const modalIsOpen = (state = initialState.modalIsOpen, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state
    default:
      return state
  }
}

export default modalIsOpen
