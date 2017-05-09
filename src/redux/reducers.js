import { combineReducers } from 'redux'
import { SELECT_MAP, SELECT_YEAR, SELECT_CITY } from './constants'

const initialState = {
  selectedMap: 'TOP_CITY',
  selectedYear: '2016',
  selectedCity: null
}

// const vectorMap = (state = initialState.vectorMap, action) => {

// }
const selectedMap = (state = initialState.selectedMap, action) => {
  console.log('selectedMap::state', state, 'action', action)
  switch (action.type) {
    case SELECT_MAP:
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
    case SELECT_YEAR:
      // console.log('SELECT_YEAR::ACTION', action)
      return action.selectedYear
    default:
      // console.log('SELECT_YEAR::DEFAULT')
      return state
  }
}

const selectedCity = (state = initialState.selectedCity, action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.selectedCity
    default:
      return state
  }
}

const reducer = combineReducers({
  // vectorMap,
  selectedMap,
  selectedYear,
  selectedCity
})

export default reducer
