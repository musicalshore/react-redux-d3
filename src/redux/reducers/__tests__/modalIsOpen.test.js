import {SELECT_CITY} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../modalIsOpen'

describe('modalIsOpen reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.modalIsOpen)
  })
  it('should return true if a city is selected', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY,
        id: 'Boise'
      })
    ).toEqual(true)
  })
  it('should return false if a city is not selected', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY,
        id: ''
      })
    ).toEqual(false)
  })
})
