import React from 'react'
import { shallow } from 'enzyme'
import MapSelector from './MapSelector'

function setup () {
  const props = {
    onYearChange: jest.fn(),
    onStateChange: jest.fn(),
    selectedYear: '2016'
  }

  const enzymeWrapper = shallow(<MapSelector {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('MapSelector', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('select').length).toBe(2)

      // expect(enzymeWrapper.find('div.container').childAt(0).type()).toEqual('select')


      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    })

    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  })
})
