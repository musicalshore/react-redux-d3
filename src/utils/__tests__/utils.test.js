import {Ordinal, filterByField, getLocationsByYear, getLocationsByYearAndState, mapLocationData, pickAndTrimStartsWith} from 'utils/utils'

import React from 'react'
import _ from 'lodash/fp'
import bestDriverJson from 'data/best-driver-2017.json'
import cityStateJson from 'city-state.json'
import { shallow } from 'enzyme'

describe('Ordinal', () => {
  it('should render ordinal numbers without <sup />', () => {
    let wrapper = shallow(<Ordinal number={1} />)
    expect(wrapper.text()).toEqual('1st')

    wrapper = shallow(<Ordinal number={2} />)
    expect(wrapper.text()).toEqual('2nd')

    wrapper = shallow(<Ordinal number={3} />)
    expect(wrapper.text()).toEqual('3rd')

    wrapper = shallow(<Ordinal number={11} />)
    expect(wrapper.text()).toEqual('11th')
  })
  it('should render ordinal numbers with <sup />', () => {
    let wrapper = shallow(<Ordinal number={1} sup={true}/>)
    expect(wrapper.html()).toEqual('<span>1<sup>st</sup></span>')
  })
})

describe('filterByField', () => {
  describe('should filter by State', () => {
    it('should return all State=TX ', () => {
      const data = filterByField(cityStateJson, 'TX', 'State')
      expect(data).toHaveLength(2)
      expect(data).toContainEqual({State: 'TX', City: 'Austin'})
    })
    it('should return an empty array', () => {
      const data = filterByField(cityStateJson, 'NY', 'State')
      expect(data).toHaveLength(0)
    })
  })

  describe('field absent from collection', () => {
    it('should throw an error', () => {
      expect(() => {
        filterByField(cityStateJson, 'TX', 'Clurple')
      }).toThrowError()
    })
  })
})

describe('pickAndTrimStartsWith', () => {
  const mock = {
    '2017 Foo Bar': 7,
    '2017 Test Data': 1,
    '2016 Foo Bar': 2,
    '2016 Test Data': 'apple'
  }
  it('should pick properties from object that start with the prefix and strip the prefix', () => {
    const result = pickAndTrimStartsWith(mock, '2017')
    expect(_.keys(result)).toHaveLength(2)
    expect(result).toHaveProperty('Foo Bar', 7)
  })
})

describe('mapLocationData', () => {
  const years = ['2017', '2016']
  const result = mapLocationData(years, bestDriverJson)
  const location = result[1]
  it('should map one to one', () => {
    expect(result).toHaveLength(3)
  })
  it('should have properties for each year', () => {
    _.each((year) => {
      expect(location).toHaveProperty(year.toString())
    }, years)
  })

  it('should have all the metrics', () => {
    expect(_.keys(location['2017'])).toHaveLength(10)
  })

  it('should have the correct value for metrics', () => {
    expect(location).toHaveProperty('2017.Rain & Snow', 2)
  })
})

const mockLocationData = [{
  city: 'Foo City',
  state: 'XX',
  cityState: 'Foo City, XX',
  latLng: [ 10, 20 ],
  metropolitanArea: 'Foo City Metro',
  '2016': {
    'metric 1': 10,
    'metric 2': 20
  }
}, {
  city: 'Foobar',
  state: 'YY',
  cityState: 'Foobar, YY',
  latLng: [ 33, 33 ],
  metropolitanArea: 'Foobar Metro',
  '2016': {
    'metric 1': 99,
    'metric 2': 5
  }
}, {
  city: 'Bklj',
  state: 'YY',
  cityState: 'Bklj, YY',
  latLng: [ 33, 66 ],
  metropolitanArea: 'Foobar Metro',
  '2016': {
    'metric 1': 2,
    'metric 2': 4
  }
}]
describe('getLocationsByYear', () => {
  it('should return location data with metrics for the specified year', () => {
    const result = getLocationsByYear('2016', mockLocationData)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      city: 'Foo City',
      state: 'XX',
      cityState: 'Foo City, XX',
      latLng: [ 10, 20 ],
      metropolitanArea: 'Foo City Metro',
      rankings: {
        'metric 1': 10,
        'metric 2': 20
      }
    })
  })
})

describe('getLocationsByYearAndState', () => {
  it('should filter by state', () => {
    let result = getLocationsByYearAndState('2016', 'YY', mockLocationData)
    expect(result).toHaveLength(2)
    result = getLocationsByYearAndState('2016', 'XX', mockLocationData)
    expect(result).toHaveLength(1)
  })
  it('should throw an error if state is not provided', () => {
    expect(() => {
      getLocationsByYearAndState('2016', '', mockLocationData)
    }).toThrowError()
    expect(() => {
      getLocationsByYearAndState('2016', null, mockLocationData)
    }).toThrowError()
    expect(() => {
      getLocationsByYearAndState('2016')
    }).toThrowError()
  })
})
