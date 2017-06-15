import {DEFAULT_MAP, DEFAULT_YEAR, MAPS} from 'constants/maps'

import {SELECT_MAP} from 'constants/actionTypes'
import _ from 'lodash/fp'
import initialState from 'redux/initialState'

const selectedMap = (state = initialState.selectedMap, action) => {
  switch (action.type) {
    case SELECT_MAP:
      return !action.id ? DEFAULT_MAP : action.id
    default:
      return state
  }
}

export default selectedMap
