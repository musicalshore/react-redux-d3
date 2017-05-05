import { combineReducers } from 'redux'
import { VectorMaps } from 'actions'
// const { TOP_CITY } = VectorMaps


const initialState = {
  selectedMap: VectorMaps.topCity,
  selectedYear: '2016'
}

const selectedMap = (state = initialState.selectedMap, action) => {
  // console.log('selectedMap::state', state, 'action', action)
  switch (action.type) {
    case 'SELECT_MAP':
      // console.log('SELECT_MAP::ACTION', action)
      return action.selectedMap
    default:
      // console.log('SELECT_MAP::DEFAULT')
      return state
  }
}

const selectedYear = (state = initialState.selectedYear, action) => {
  // console.log('selectedYear::state', state, 'action', action)
  switch (action.type) {
    case 'SELECT_YEAR':
      // console.log('SELECT_YEAR::ACTION', action)
      return action.selectedYear
    default:
      // console.log('SELECT_YEAR::DEFAULT')
      return state
  }
}

const reducer = combineReducers({
  selectedMap,
  selectedYear
})

export default reducer
