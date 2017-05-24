import { SELECT_MAP, SELECT_CITY, FILTER_STATE } from 'constants/actionTypes'

export const selectMap = (selectedMap) => ({
  type: SELECT_MAP,
  selectedMap
})

export const filterState = (stateFilter) => ({
  type: FILTER_STATE,
  stateFilter
})

export const selectCity = (selectedCity) => ({
  type: SELECT_CITY,
  selectedCity
})
