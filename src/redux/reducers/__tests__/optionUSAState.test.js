import {OPTION_USA_STATE, SELECT_MAP} from 'constants/actionTypes'

import {DEFAULT_MAP} from 'constants/maps'
import initialState from 'redux/initialState'
import reducer from '../optionUSAState'

describe('optionUSAState reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.optionUSAState)
  })
  it('should return the selected USA state from the selected map', () => {
    expect(
      reducer(undefined, {
        type: SELECT_MAP,
        id: DEFAULT_MAP,
        year: '2016',
        USAStateId: 'DE'
      })
    ).toEqual('DE')
  })
  it('should return the current option from the USA state selector', () => {
    expect(
      reducer(undefined, {
        type: OPTION_USA_STATE,
        id: 'TX'
      })
    ).toEqual('TX')
  })
})
