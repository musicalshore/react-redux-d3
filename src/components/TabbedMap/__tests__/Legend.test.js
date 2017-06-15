import Legend from '../Legend'
import React from 'react'
import { shallow } from 'enzyme'

function setup () {
  const wrapper = shallow(<Legend />)
  return {wrapper}
}

describe('Legend', () => {
  it('should render self', () => {
    const { wrapper } = setup()
    expect(wrapper.find('div').hasClass('legend-container')).toBe(true)
    expect(wrapper.find('ul').children()).toHaveLength(3)
  })
})
