import _ from 'lodash/fp'
import React from 'react'
import { shallow } from 'enzyme'
import MapSelector from './MapSelector'
import {getMapData} from 'redux/reducers'
import {MAPS, DEFAULT_MAP, CURRENT_YEAR, US_STATES} from 'constants/maps'
import BEST_DRIVER_DATA from 'constants/bestDriver'
// const debug = require('debug')('MapSelectorSpec')

const initialMap = _.extend(_.find(['id', DEFAULT_MAP], MAPS), {
  year: CURRENT_YEAR,
  stateFilter: ''
})
const mapData = {mapData: getMapData(initialMap)}
// console.log('mapData-->', mapData)

function setup () {
  const props = {
    onMapSelect: jest.fn(),
    selectedMap: _.extend(initialMap, mapData),
    selectedCity: null
  }

  const enzymeWrapper = shallow(<MapSelector {...props} />)

  return {
    props,
    enzymeWrapper
  }
}




describe('components', () => {
  describe('MapSelector', () => {
    it('should get a list of states that belong to the data', () => {
      const { props, enzymeWrapper } = setup()
      const mapSelector = new MapSelector(props)
      const states = mapSelector.getStates(props.selectedMap.mapData.markers)
      expect(states['AZ']).toEqual('Arizona')
    })
    // it('should render self and subcomponents', () => {
    //   const { enzymeWrapper, props } = setup()

    //   expect(enzymeWrapper.find('select').length).toBe(2)

    //   // expect(enzymeWrapper.find('div.container').childAt(0).type()).toEqual('select')


    //   // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
    //   // expect(todoInputProps.newTodo).toBe(true)
    //   // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    // })

    // // it('should call addTodo if length of text is greater than 0', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  })
})
