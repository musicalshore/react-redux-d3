import { SELECT_MAP, SELECT_YEAR, SELECT_CITY } from './constants'

export const selectMap = (selectedMap) => ({
  type: SELECT_MAP,
  selectedMap
})

export const selectYear = (selectedYear) => ({
  type: SELECT_YEAR,
  selectedYear
})

export const selectCity = (selectedCity) => ({
  type: SELECT_CITY,
  selectedCity
})

export const selectState = (selectedState) => ({
  type: SELECT_CITY,
  selectedState
})

// export const openModal = (isModalOpen) => ({
//   type: 'OPEN_MODAL',
//   isModalOpen
// })
