import {getLocationsByYear, getLocationsByYearAndState} from 'utils/utils'

import {ERRORS} from 'constants/errors'
import {MAPS} from 'constants/maps'
import {SELECT_MAP} from 'constants/actionTypes'
import _ from 'lodash/fp'
import initialState from 'redux/initialState'

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case SELECT_MAP:
      console.log(' SELECT_MAPaction: ', action)
      const locations = action.USAStateId ? getLocationsByYearAndState(action.year, action.USAStateId) : getLocationsByYear(action.year)
      const rankingType = _.get('rankingType', _.find(['id', action.id], MAPS))
      console.log('rankingType: ', rankingType)

      if (!_.find(_.has(`rankings.${rankingType}`), locations)) {
        console.log('no data for rankingType: ', rankingType)
        const result = _.find(['type', 'NO_DATA'], ERRORS)
        console.log('result: ', result)
        return _.extend({}, result)
      }

      return null

    default:
      return state
  }
}

export default error
