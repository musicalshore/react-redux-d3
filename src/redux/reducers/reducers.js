import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import error from './error'
import locations from './locations'
import modalIsOpen from './modalIsOpen'
import optionUSAState from './optionUSAState'
import optionYear from './optionYear'
import selectedCity from './selectedCity'
import selectedMap from './selectedMap'
import selectedUSAState from './selectedUSAState'
import selectedYear from './selectedYear'

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
/*
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
*/

const reducer = combineReducers({
  error,
  locations,
  modalIsOpen,
  optionUSAState,
  optionYear,
  selectedCity,
  selectedMap,
  selectedUSAState,
  selectedYear
})

export default reducer
