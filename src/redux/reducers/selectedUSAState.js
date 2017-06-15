import {SELECT_MAP} from 'constants/actionTypes'
import {USA_STATES} from 'constants/maps'
import _ from 'lodash/fp'
import {getLocationsByYearAndState} from 'utils/utils'
import initialState from 'redux/initialState'

const selectedUSAState = (state = initialState.selectedUSAState, action) => {
  switch (action.type) {
    case SELECT_MAP:
      if (!action.USAStateId) {
        return null
      }
      const locations = getLocationsByYearAndState(action.year, action.USAStateId)
      const selectedUSAState = {
        id: action.USAStateId,
        name: _.get('name', _.find(['id', action.USAStateId], USA_STATES)),
        totalSafeCities: locations.length
      }

      return selectedUSAState

    default:
      return state
  }
}

export default selectedUSAState
