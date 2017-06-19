import {SELECT_MAP, SELECT_CITY, SET_ZOOM_STEP} from 'constants/actionTypes'
import {MAX_ZOOM_STEP, MIN_ZOOM_STEP, CITY_ZOOM_STEP} from 'constants/maps'
import initialState from 'redux/initialState'
import reducer from '../zoomStep'

describe('zoomStep reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.zoomStep)
  })
  it('should set the zoomStep', () => {
    expect(
      reducer(undefined, {
        type: SET_ZOOM_STEP,
        zoomStep: 3
      })
    ).toEqual(3)
  })

  it('should set zoomStep to city zoom when a city is selected', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY,
        cityState: 'foo'
      })
    ).toEqual(CITY_ZOOM_STEP)
  })
  it('should set zoomStep to initial zoom when a city is unselected', () => {
    expect(
      reducer(undefined, {
        type: SELECT_CITY,
        cityState: ''
      })
    ).toEqual(initialState.zoomStep)
  })
})
