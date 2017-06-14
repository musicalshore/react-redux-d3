import {SELECT_MAP} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../selectedYear'

describe('selectedYear reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.selectedYear)
  })
  it('should return the selected year state', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        year: '2016'
      })
    ).toEqual('2016')
  })
})
