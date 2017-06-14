import {OPTION_YEAR, SELECT_MAP} from 'constants/actionTypes'

import {DEFAULT_MAP} from 'constants/maps'
import initialState from 'redux/initialState'
import reducer from '../optionYear'

describe('optionYear reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.optionYear)
  })
  it('should return the selected map year', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        year: '2016'
      })
    ).toEqual('2016')
  })
  it('should return the current year option', () => {
    expect(
      reducer(undefined, {
        type: OPTION_YEAR,
        year: '2016'
      })
    ).toEqual('2016')
  })
})
