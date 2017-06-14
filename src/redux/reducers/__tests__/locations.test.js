import {DEFAULT_MAP} from 'constants/maps'
import {SELECT_MAP} from 'constants/actionTypes'
import reducer from '../locations.js'

describe('locations reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })
  it('should return the 2016 location data', () => {
    const newState = reducer(undefined, {
      type: SELECT_MAP,
      id: DEFAULT_MAP,
      year: '2016'
    })
    expect(newState[0]).toHaveProperty('city', 'Kansas City')
    expect(newState[0]).toHaveProperty('rankings.Top Cities', 2)
  })

  it('should throw an error if selected map does not exist', () => {
    expect(() => {
      reducer(undefined, {
        type: SELECT_MAP,
        id: 'gibberish'
      })
    }).toThrowError()
  })
})

const initialState = [{
  cityState: 'Kansas City, KS',
  city: 'Kansas City',
  state: 'KS',
  lngLat: [ -94.627, 39.114 ],
  newLocation: false,
  mostImproved: false,
  biggestDecrease: false,
  metropolitanArea: 'Kansas City, MO-KS',
  rankings: {
    'Top Cities': 1,
    'Previous Top Cities': 2,
    'Average Years Between Accidents': 14.9,
    'National Average Risk Relative to City Average': '-32.8%',
    'Rain & Snow': 1,
    'Population Density': 3,
    'Hard Braking Rank': 1,
    'Braking Events per 1000 Miles (city)': 9.9,
    'Years Between Accidents (Suburban Area only)': 12.2,
    'Suburban Braking Events per 1000 Miles': 11.7,
    Change: 1
  }
}, {
  cityState: 'Brownsville, TX',
  city: 'Brownsville',
  state: 'TX',
  lngLat: [ -97.497, 25.901],
  newLocation: false,
  mostImproved: false,
  biggestDecrease: false,
  metropolitanArea: 'Brownsville-Harlingen, TX',
  rankings: {
    'Top Cities': 2,
    'Previous Top Cities': 1,
    'Average Years Between Accidents': 14.5,
    'National Average Risk Relative to City Average': '-30.9%',
    'Rain & Snow': 2,
    'Population Density': 4,
    'Hard Braking Rank': 'N/A',
    'Braking Events per 1000 Miles (city)': 'N/A',
    'Years Between Accidents (Suburban Area only)': 14.5,
    'Suburban Braking Events per 1000 Miles': 'N/A',
    Change: -1
  }
}, {
  cityState: 'Laredo, TX',
  city: 'Laredo',
  state: 'TX',
  lngLat: [ -99.48, 27.53 ],
  newLocation: false,
  mostImproved: false,
  biggestDecrease: false,
  metropolitanArea: 'Laredo, TX',
  rankings: {
    'Top Cities': 7,
    'Previous Top Cities': 12,
    'Average Years Between Accidents': 12,
    'National Average Risk Relative to City Average': '-16.8%',
    'Rain & Snow': 8,
    'Population Density': 5,
    'Hard Braking Rank': 'N/A',
    'Braking Events per 1000 Miles (city)': 'N/A',
    'Years Between Accidents (Suburban Area only)': 13.8,
    'Suburban Braking Events per 1000 Miles': 'N/A',
    Change: 5
  }
}]
