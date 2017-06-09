import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import {MAPS, DEFAULT_MAP, DEFAULT_YEAR, DENSITY, RAIN_SNOW, US_STATES} from 'constants/maps'
import {SELECT_MAP, SELECT_CITY, FILTER_STATE, SELECT_YEAR_OPTION, SELECT_STATE_OPTION} from 'constants/actionTypes'
import BEST_DRIVER_DATA from 'constants/bestDriver'

// const marker = _.curry((year, rankingType, location) => _.extend({
//   rank: location[`${year} ${rankingType}`],
//   rankingType: rankingType
// }, location))

export const getMapData = ({id, year, rankingType, stateFilter = null}) => {
  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers
  const bestDriverData = stateFilter.length && stateFilter !== 'All' ? _.filter(['State', stateFilter], BEST_DRIVER_DATA) : BEST_DRIVER_DATA
  const locationData = _.reduce((result, location) => {
    // console.log('location', location)

    const yearRankingType = `${year} ${rankingType}`
    const key = _.snakeCase(`${yearRankingType} ${location.cityState}`)
    let rank = location[yearRankingType]
    const yearMetrics = _.pickBy.convert({cap: false})((val, key) => _.startsWith(year, key), location)
    const additionalData = _.pick(['cityState', 'mostImproved', 'newLocation', 'latLng', 'metropolitanArea', 'city', 'state'], location)
    if (!rank) {
      return result
    }
    return _.concat(result, _.extendAll([{
      id,
      year,
      key,
      rank,
      rankingType
    }, yearMetrics, additionalData]))
  }, [], bestDriverData)
  // const markers = _.map(marker(year, rankingType))
  if (!locationData.length) {
    // throw new Error('No locationData found.')
    return null
  }

  const rankingsByYearAndType = _.flow([
    _.filter('rank'),
    _.sortBy('rank'),
    _.reverse
  ])(locationData)

  const minTopTenRank = _.minBy('rank', rankingsByYearAndType).rank + 10

  const seriesValues = _.map((value) => {
    if (value.rank && value.rank < minTopTenRank) {
      return 'topTen'
    } else {
      return 'notTopTen'
    }
  }, rankingsByYearAndType)
  let locations = []
  for (let i = 0; i < rankingsByYearAndType.length; i++) {
    locations.push(_.extend(rankingsByYearAndType[i], {
      index: i,
      seriesValue: seriesValues[i]
    }))
  }

  const mapData = {
    locations,
    series: {
      markers: [{
        values: seriesValues
      }]
    },
    labels: {
      markers: {
        render: function (rank) {
          return rankingsByYearAndType[parseInt(rank)].cityState
        }
      }
    }
  }

  return mapData
}

export const getSafeCityData = (year, usState) => {
  let name = _.get('name', _.find(['id', usState], US_STATES))
  let stateData = _.filter(['State', usState], BEST_DRIVER_DATA)
  let safeCityCount = _.size(_.filter(`${year} Top Cities`, stateData))
  const safeCityData = {
    safeCityCount,
    name
  }
  return safeCityData
}

const selectedMap = (state = {}, action) => {
  const defaultMap = _.extend(_.find(['id', DEFAULT_MAP], MAPS), {
    year: DEFAULT_YEAR,
    stateFilter: '',
    safeCityData: {}
  })
  let result
  switch (action.type) {
    case SELECT_MAP:
      let mapData
      let safeCityData = {}
      let selectedMap = _.isEmpty(action.selectedMap) ? defaultMap : action.selectedMap
      if (selectedMap.id !== DEFAULT_MAP && parseInt(selectedMap.year) < 2014) {
        selectedMap = _.extend(selectedMap, {
          year: selectedMap.year,
          mapData: null
        })
        return selectedMap
      }
      mapData = getMapData(selectedMap)
      selectedMap = _.extend(selectedMap, {mapData})
      if (selectedMap.stateFilter !== '' && !_.isNull(mapData)) {
        safeCityData = getSafeCityData(selectedMap.year, selectedMap.stateFilter)
      }
      selectedMap = _.extend(selectedMap, {safeCityData})
      return selectedMap
    default:
      if (_.isEmpty(state)) {
        const mapData = getMapData(defaultMap)
        result = _.extend(defaultMap, {mapData})
      }
      return _.extend(state, result)
  }
}

const selectedCity = (state = null, action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.selectedCity
    default:
      return state
  }
}

// const activeElement = (state = null, action) => {
//   switch (action.type) {
//     case SELECT_CITY:
//       const activeElement = action.selectedCity.source
//       console.log('source', activeElement)
//       return activeElement || null
//     default:
//       return state
//   }
// }
const modalIsOpen = (state = false, action) => {
  switch (action.type) {
    case SELECT_CITY:
      const modalIsOpen = !_.isEmpty(action.selectedCity)
      // console.log('modalIsOpen', modalIsOpen, 'action', action, 'state', _.extend(state, modalIsOpen))
      return modalIsOpen
    default:
      return state
  }
}

const selectedYearOption = (state = DEFAULT_YEAR, action) => {
  switch (action.type) {
    case SELECT_YEAR_OPTION:
      return action.selectedYearOption
    case SELECT_MAP:
      let year = _.getOr(DEFAULT_YEAR, 'selectedMap.year', action)
      console.log('selectedYearOption!!', year)
      return year
    default:
      return state
  }
}

const selectedStateOption = (state = '', action) => {
  switch (action.type) {
    case SELECT_STATE_OPTION:
      return action.selectedStateOption
    case SELECT_MAP:
      let stateFilter = _.getOr('', 'selectedMap.stateFilter', action)
      // console.log('actionactionactionaction', action);
      return stateFilter
    default:
      return state
  }
}

const errorMessage = (state = '', action) => {
  switch (action.type) {
    case SELECT_MAP:
      const {id, year, stateFilter} = _.pick(['id', 'year', 'stateFilter'], action.selectedMap)
      let mapData
      let error
      if (id && year) {
        mapData = getMapData(action.selectedMap)
      }
      console.log('errorMessage:', id, year, mapData, action.selectedMap)

      if (_.isNull(mapData) || ((id === DENSITY || id === RAIN_SNOW) && _.parseInt(year) < 2014)) {
        error = 'No data found. Please select a different year, state or filter.'
      } else {
        error = ''
      }
      return error
    default:
      return state
  }
}

const defaultYear = (state = DEFAULT_YEAR) => state
const defaultMap = (state = DEFAULT_MAP) => state

const reducer = combineReducers({
  selectedMap,
  selectedCity,
  modalIsOpen,
  defaultYear,
  defaultMap,
  selectedYearOption,
  selectedStateOption,
  errorMessage
})

export default reducer
