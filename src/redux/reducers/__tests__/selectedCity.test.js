import {SELECT_CITY} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../selectedCity'

describe('selectedCity reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.selectedCity)
  })
  it('should return the selected city', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY,
        cityState: 'Austin, TX'
      })
    ).toEqual('Austin, TX')
  })
  it('should return an empty string if cityState is missing', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY
      })
    ).toEqual('')
  })
})
