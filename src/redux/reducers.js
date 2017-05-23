import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import {MAPS, DEFAULT_MAP, CURRENT_YEAR} from 'constants/maps'
import {SELECT_MAP, SELECT_CITY} from 'constants/actionTypes'
import BEST_DRIVER_DATA from 'constants/bestDriver'

const marker = _.curry((year, rankingType, location) => _.extend({
  rank: location[`${year} ${rankingType}`],
  rankingType: rankingType
}, location))

export const getMapData = ({year, rankingType, stateFilter = null}) => {
  // console.log("getMapData ", year, rankingType, stateFilter);

  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers

  const bestDriverData = stateFilter.length ? _.filter(['State', stateFilter], BEST_DRIVER_DATA) : BEST_DRIVER_DATA
  const rankingsByYearAndType = _.flow([
    _.map(marker(year, rankingType)),
    _.filter('rank'),
    _.sortBy('rank'),
    _.reverse
  ])(bestDriverData)

  // _.reverse(_.sortBy('rank', _.filter(_.map(marker(year, rankingType), BEST_DRIVER_DATA))))
  // console.log('rankingsByYearAndType', rankingsByYearAndType)

  const minTopTenRank = _.minBy('rank', rankingsByYearAndType).rank + 10
  // console.log('minTopTenRank', minTopTenRank)

  const seriesValues = _.map((value) => {
    if (value.rank && value.rank < minTopTenRank) {
      return 'topTen'
    } else {
      return 'notTopTen'
    }
  }, rankingsByYearAndType)
  let markers = []
  for (let i = 0; i < rankingsByYearAndType.length; i++) {
    markers.push(_.extend(rankingsByYearAndType[i], {
      index: i,
      seriesValue: seriesValues[i]
    }))
  }
  // console.log("markers ", markers);
  const mapData = {
    markers: markers,
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
const initialMap = _.extend(_.find(['id', DEFAULT_MAP], MAPS), {
  year: CURRENT_YEAR,
  stateFilter: ''
})

// console.log('initialMap:::', initialMap)
const mapData = {mapData: getMapData(initialMap)}
// console.log('mapData-->', mapData)

const initialState = {
  selectedMap: _.extend(initialMap, mapData),
  selectedCity: null
}


// console.log('initialState:::', initialState);

// const vectorMap = (state = initialState.vectorMap, action) => {

// }
const selectedMap = (state = initialState.selectedMap, action) => {
  // console.log('selectedMap::state', state, 'action', action)
  switch (action.type) {
    case SELECT_MAP:
      // console.log('SELECT_MAP::ACTION', action)
      // const selectedMap = _.extend(action.selectedMap, {
      //   rankingType: MAPS[action.selectedMap.id].rankingType
      // })
      const mapData = {mapData: getMapData(action.selectedMap)}
      // console.log("mapData ", mapData)
      const result = _.extend(action.selectedMap, mapData)
      // console.log('result', result)
      return result
    default:
      return state
  }
}

const selectedCity = (state = initialState.selectedCity, action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.selectedCity
    default:
      return state
  }
}

const reducer = combineReducers({
  selectedMap,
  selectedCity
})

export default reducer
