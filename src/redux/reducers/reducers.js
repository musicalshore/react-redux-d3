import {combineReducers} from 'redux'
import error from './error'
import zoomStep from './zoomStep'
import locations from './locations'
import modalIsOpen from './modalIsOpen'
import optionUSAState from './optionUSAState'
import optionYear from './optionYear'
import selectedCity from './selectedCity'
import selectedMap from './selectedMap'
import selectedUSAState from './selectedUSAState'
import selectedYear from './selectedYear'

const reducer = combineReducers({
  error,
  zoomStep,
  locations,
  modalIsOpen,
  optionUSAState,
  optionYear,
  selectedCity,
  selectedMap,
  selectedUSAState,
  selectedYear
})

export default reducer
