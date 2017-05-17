import * as actions from './actions.js'
import * as types from '../constants/actionTypes'

describe('actions', () => {
  it('should create an action to select the year', () => {
    const selectedYear = '1999'
    const expectedAction = {
      type: types.SELECT_YEAR,
      selectedYear
    }
    expect(actions.selectYear(selectedYear)).toEqual(expectedAction)
  })

  // it('should create an action to select the year', () => {
  //   const selectedYear = '1999'
  //   const expectedAction = {
  //     type: types.SELECT_YEAR,
  //     selectedYear
  //   }
  //   expect(actions.selectYear(selectedYear)).toEqual(expectedAction)
  // })
})
