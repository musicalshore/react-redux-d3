import {SELECT_MAP, SELECT_CITY, SET_ZOOM_STEP} from 'constants/actionTypes'
import {CITY_ZOOM_STEP} from 'constants/maps'
import initialState from 'redux/initialState'

const zoomStep = (state = initialState.zoomStep, action) => {
  switch (action.type) {
    case SET_ZOOM_STEP:
      return action.zoomStep
    case SELECT_MAP:
      return initialState.zoomStep
    case SELECT_CITY:
      if (action.cityState !== '') {
        return CITY_ZOOM_STEP
      } else {
        return initialState.zoomStep
      }
    default:
      return state
  }
}

export default zoomStep
