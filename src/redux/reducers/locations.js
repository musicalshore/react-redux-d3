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
        throw new Error(`"${action.id}" is not a recognized map.`)
      }

      if (action.USAStateId) {
        locations = getLocationsByYearAndState(action.year, action.USAStateId)
        if (_.isEmpty(locations)) {
          console.error(`"${action.year} ${action.id}" returned no location data for USA state "${action.USAStateId}".`)
        }
      } else {
        locations = getLocationsByYear(action.year)
        if (_.isEmpty(locations)) {
          console.error(`"${action.year} ${action.id}" returned no location data.`)
        }
      }
      return locations

    default:
      return state
  }
}

export default locations
