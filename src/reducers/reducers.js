// import _ from 'lodash/fp'
import { combineReducers } from 'redux'
import { SELECT_MAP, SELECT_YEAR, SELECT_CITY } from 'constants/actionTypes'
// import { MAPS } from 'constants/maps'
import { getMapDataByIdAndYear } from './mapData'

const initialState = {
  selectedMap: {
    id: 'TOP_CITY',
    year: '2016',
    mapData: getMapDataByIdAndYear('TOP_CITY', '2016')
  },
  // selectedYear: '2016',
  selectedCity: null
}

const selectedMap = (state = initialState.selectedMap, action) => {
  switch (action.type) {
    case SELECT_MAP:
      return {
        id: action.id,
        year: action.year,
        mapData: getMapDataByIdAndYear(action.id, action.year)
      }
    default:
      return state
  }
}

// const selectedYear = (state = initialState.selectedYear, action) => {
//   switch (action.type) {
//     case SELECT_YEAR:
//       return action.selectedYear
//     default:
//       return state
//   }
// }

const selectedCity = (state = initialState.selectedCity, action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.selectedCity
    default:
      return state
  }
}

// const mapData = (state = initialState.mapData, action) => {
//   switch (action.type) {
//     case GET_MAP_DATA:
//       return action.mapData
//     default:
//       return state
//   }
// }

const reducer = combineReducers({
  selectedMap,
  // selectedYear,
  selectedCity
  // mapData
})

export default reducer
