import {TOGGLE_MODAL} from 'constants/actionTypes'
import initialState from 'redux/initialState'
import reducer from '../modalIsOpen'

describe('modalIsOpen reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.modalIsOpen)
  })
  it('should toggle from false to true', () => {
    expect(
      reducer(false, {
        type: TOGGLE_MODAL
      })
    ).toEqual(true)
  })
  it('should toggle from true to false', () => {
    expect(
      reducer(true, {
        type: TOGGLE_MODAL
      })
    ).toEqual(false)
  })
})
