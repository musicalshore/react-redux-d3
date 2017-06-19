import {DEFAULT_YEAR, MAPS} from 'constants/maps'
import {getLocationsByYear, getLocationsByYearAndState} from 'utils/utils'

import {SELECT_MAP} from 'constants/actionTypes'
import _ from 'lodash/fp'
import initialState from 'redux/initialState'

const locations = (state = initialState.locations, action) => {
  switch (action.type) {
    case SELECT_MAP:
      // console.log('action: ', action)
      const selectedMap = _.find(['id', action.id], MAPS)
      let locations = []
      if (_.isEmpty(selectedMap)) {
        console.warn(`"${action.id}" is not a recognized map.`)
      }

      if (action.USAStateId) {
        locations = getLocationsByYearAndState(action.year, action.USAStateId)
      } else {
        locations = getLocationsByYear(action.year)
      }
      return locations

    default:
      return state
  }
}

export default locations
