import {SELECT_CITY} from 'constants/actionTypes'
import initialState from 'redux/initialState'

const selectedCity = (state = initialState.selectedCity, action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.cityState || ''
    default:
      return state
  }
}

export default selectedCity
