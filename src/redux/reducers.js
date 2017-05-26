import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import {MAPS, DEFAULT_MAP, CURRENT_YEAR, TOP_CITY} from 'constants/maps'
import {SELECT_MAP, SELECT_CITY, FILTER_STATE} from 'constants/actionTypes'
import BEST_DRIVER_DATA from 'constants/bestDriver'

const marker = _.curry((year, rankingType, location) => _.extend({
  rank: location[`${year} ${rankingType}`],
  rankingType: rankingType
}, location))

export const getMapData = ({year, rankingType, stateFilter = null}) => {
  // console.log("getMapData ", year, rankingType, stateFilter);

  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers

  const bestDriverData = stateFilter.length && stateFilter !== 'All' ? _.filter(['State', stateFilter], BEST_DRIVER_DATA) : BEST_DRIVER_DATA
  const rankingsByYearAndType = _.flow([
    _.map(marker(year, rankingType)),
    _.filter('rank'),
    _.sortBy('rank'),
    _.reverse
  ])(bestDriverData)

  const minTopTenRank = _.minBy('rank', rankingsByYearAndType).rank + 10

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

const mapData = {mapData: getMapData(initialMap)}

const initialState = {
  selectedMap: _.extend(initialMap, mapData),
  selectedCity: null,
  disableOthers: false
}

const selectedMap = (state = initialState.selectedMap, action) => {
  // console.log('selectedMap::state', state, 'action', action)
  switch (action.type) {
    case SELECT_MAP:
      let mapData
      let result
      mapData = {mapData: getMapData(action.selectedMap)}
      // if (parseInt(action.selectedMap.year) > 2013) {
      //   mapData = {mapData: getMapData(action.selectedMap)}
      // } else {
      //   let map = _.extend(action.selectedMap, _.find(['id', TOP_CITY], MAPS))
      //   console.log('mapmapmapmap',map);

      //   mapData = {mapData: getMapData(map), disableOthers: true}
      // }
      result = _.extend(action.selectedMap, mapData)
      return result
    case FILTER_STATE:
      return _.extend(state, {stateFilter: action.stateFilter})
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
