import {DEFAULT_MAP, DEFAULT_YEAR, DENSITY, MIN_ZOOM_STEP} from 'constants/maps'

import {SELECT_MAP, SELECT_CITY, OPTION_YEAR, OPTION_USA_STATE, SET_ZOOM_STEP} from 'constants/actionTypes'
import {selectMap, selectCity, optionYear, optionUSAState, setZoomStep} from '../actions'

describe('actions', () => {
  describe('selectMap', () => {
    it('should create an action to select the default map and year', () => {
      const expectedAction = {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        year: DEFAULT_YEAR,
        USAStateId: ''
      }
      expect(selectMap({})).toEqual(expectedAction)
      expect(selectMap({year: DEFAULT_YEAR})).toEqual(expectedAction)
      expect(selectMap({id: DEFAULT_MAP})).toEqual(expectedAction)
    })
    it('should create an action to select a map and a year', () => {
      expect(
        selectMap({id: DENSITY, year: '2001'})
      ).toEqual({
        type: SELECT_MAP,
        id: DENSITY,
        year: '2001',
        USAStateId: ''
      })
    })
    it('should create an action to select a USA state', () => {
      expect(
        selectMap({id: DENSITY, year: '2001', USAStateId: 'TX'})
      ).toEqual({
        type: SELECT_MAP,
        id: DENSITY,
        year: '2001',
        USAStateId: 'TX'
      })
    })
  })

  describe('selectCity', () => {
    it('should create an action to select a city', () => {
      expect(
        selectCity('Austin, TX')
      ).toEqual({
        type: SELECT_CITY,
        cityState: 'Austin, TX'
      })
    })
  })

  describe('optionYear', () => {
    it('should create an action to set the year selector', () => {
      expect(
        optionYear('1999')
      ).toEqual({type: OPTION_YEAR, year: '1999'})
    })
  })

  describe('optionUSAState', () => {
    it('should create an action to set the USA state selector', () => {
      expect(
        optionUSAState('TX')
      ).toEqual({type: OPTION_USA_STATE, id: 'TX'})
    })
    it('should create an action to unset the USA state selector', () => {
      expect(
        optionUSAState()
      ).toEqual({type: OPTION_USA_STATE, id: ''})
    })
  })

  describe('setZoomStep', () => {
    it('should default to MIN_ZOOM_STEP', () => {
      expect(
        setZoomStep()
      ).toEqual({
        type: SET_ZOOM_STEP,
        zoomStep: MIN_ZOOM_STEP
      })
    })
  })
})
