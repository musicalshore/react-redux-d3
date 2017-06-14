import {DENSITY, TOP_CITY, RAIN_SNOW} from 'constants/maps'

import {SELECT_MAP} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../selectedMap'

describe('selectedMap reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.selectedMap)
  })

  it('should select the Population Density map', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DENSITY,
        year: '2016'
      })).toEqual(DENSITY)
  })
  it('should select the Rain & Snow map', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: RAIN_SNOW
      })).toEqual(RAIN_SNOW)
  })
  it('should select the Top Cities map', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP
      })).toEqual(TOP_CITY)
  })
})
