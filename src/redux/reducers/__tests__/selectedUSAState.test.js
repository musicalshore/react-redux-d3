import {DEFAULT_MAP} from 'constants/maps'
import {SELECT_MAP} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../selectedUSAState'

describe('selectedUSAState reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.selectedUSAState)
  })
  it('should set the USA state and safe city data', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        year: '2017',
        USAStateId: 'TX'
      })
    ).toEqual({
      id: 'TX',
      name: 'Texas',
      totalSafeCities: 2
    })
  })

  it('should handle states with no safe city data', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        year: '2017',
        USAStateId: 'DE'
      })
    ).toEqual({
      id: 'DE',
      name: 'Delaware',
      totalSafeCities: 0
    })
  })
})
