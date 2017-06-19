import {DEFAULT_MAP, DEFAULT_YEAR, MIN_ZOOM_STEP} from 'constants/maps'
import {OPTION_USA_STATE, OPTION_YEAR, SELECT_CITY, SELECT_MAP, TOGGLE_MODAL, SET_ZOOM_STEP} from 'constants/actionTypes'

export const selectMap = ({id = DEFAULT_MAP, year = DEFAULT_YEAR, USAStateId = ''}) => ({
  type: SELECT_MAP,
  id,
  year,
  USAStateId
})

export const selectCity = (cityState = '') => ({
  type: SELECT_CITY,
  cityState
})

export const optionYear = (year = DEFAULT_YEAR) => ({
  type: OPTION_YEAR,
  year
})

export const optionUSAState = (id = '') => ({
  type: OPTION_USA_STATE,
  id
})

export const toggleModal = () => ({
  type: TOGGLE_MODAL
})

export const setZoomStep = (zoomStep = MIN_ZOOM_STEP) => ({
  type: SET_ZOOM_STEP,
  zoomStep
})
