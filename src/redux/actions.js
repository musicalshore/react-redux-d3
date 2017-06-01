import {SELECT_MAP, SELECT_CITY, FILTER_STATE, SELECT_YEAR_OPTION, SELECT_STATE_OPTION, CHANGE_MAP_SELECTOR} from 'constants/actionTypes'

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

export const selectYearOption = (selectedYearOption) => ({
  type: SELECT_YEAR_OPTION,
  selectedYearOption
})

export const selectStateOption = (selectedStateOption) => ({
  type: SELECT_STATE_OPTION,
  selectedStateOption
})

// export const changeMapSelector = (changedMapSelector) => ({
//   type: CHANGE_MAP_SELECTOR,
//   changedMapSelector
// })
