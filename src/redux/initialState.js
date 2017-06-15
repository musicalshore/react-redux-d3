import { DEFAULT_YEAR, DEFAULT_MAP } from 'constants/maps'
import {getLocationsByYear} from 'utils/utils'

export const ERROR = null
export const LOCATIONS = getLocationsByYear(DEFAULT_YEAR)
export const MODAL_IS_OPEN = false
export const OPTION_USA_STATE = ''
export const OPTION_YEAR = DEFAULT_YEAR
export const SELECTED_CITY = ''
export const SELECTED_MAP = DEFAULT_MAP
export const SELECTED_YEAR = DEFAULT_YEAR
export const SELECTED_USA_STATE = null

const initialState = {
  error: ERROR,
  locations: LOCATIONS,
  modalIsOpen: MODAL_IS_OPEN,
  optionUSAState: OPTION_USA_STATE,
  optionYear: OPTION_YEAR,
  selectedCity: SELECTED_CITY,
  selectedMap: SELECTED_MAP,
  selectedYear: SELECTED_YEAR,
  selectedUSAState: SELECTED_USA_STATE
}

export default initialState
