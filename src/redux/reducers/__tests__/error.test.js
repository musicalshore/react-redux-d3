import {DEFAULT_MAP, DENSITY} from 'constants/maps'

import {ERRORS} from 'constants/errors'
import {SELECT_MAP} from 'constants/actionTypes'
import _ from 'lodash/fp'
import initialState from 'redux/initialState'
import reducer from '../error'

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.error)
  })

  it('should return a NO_DATA error if no location data exists', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        USAStateId: 'DE'
      })
    ).toEqual(_.find(['type', 'NO_DATA'], ERRORS))
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DENSITY,
        year: '2013'
      })
    ).toEqual(_.find(['type', 'NO_DATA'], ERRORS))
  })
  it('should be null if location data exists ', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DENSITY,
        year: '2017'
      })
    ).toBeNull()
  })
})
