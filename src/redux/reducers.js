import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import {MAPS, DEFAULT_MAP, CURRENT_YEAR} from 'constants/maps'
import {SELECT_MAP, SELECT_CITY, SELECT_STATE} from 'constants/actionTypes'
import BEST_DRIVER_DATA from 'constants/bestDriver'

const marker = _.curry((year, rankingType, location) => _.extend({
  rank: location[`${year} ${rankingType}`],
  rankingType: rankingType
}, location))

const getMapData = ({year, rankingType}) => {
 console.log("getMapData ", year, rankingType);

  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers
  const rankingsByYearAndType = _.reverse(_.sortBy('rank', _.map(marker(year, rankingType), BEST_DRIVER_DATA)))
  console.log('rankingsByYearAndType', BEST_DRIVER_DATA)

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
  console.log("markers ", markers);
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
const initialMap = {
  id: DEFAULT_MAP,
  rankingType: MAPS[DEFAULT_MAP].rankingType,
  year: CURRENT_YEAR
}
console.log('initialMap:::', initialMap)
const mapData = {mapData: getMapData(initialMap)}
console.log('mapData-->', mapData)

const initialState = {
  selectedMap: _.extend(initialMap, mapData),
  selectedCity: null,
  selectedState: null
}


console.log('initialState:::', initialState);

// const vectorMap = (state = initialState.vectorMap, action) => {

// }
const selectedMap = (state = initialState.selectedMap, action) => {
  console.log('selectedMap::state', state, 'action', action)
  switch (action.type) {
    case SELECT_MAP:
      console.log('SELECT_MAP::ACTION', action)
      const selectedMap = _.extend(action.selectedMap, {
        rankingType: MAPS[action.selectedMap.id].rankingType
      })
      const mapData = {mapData: getMapData(selectedMap)}
      const result = _.extend(selectedMap, mapData)
      console.log('result', result);
      return result
      // return _.extend(selectedMap, mapData)
    default:
      // console.log('SELECT_MAP::DEFAULT')
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

const selectedState = (state = null, action) => {
  switch (action.type) {
    case SELECT_STATE:
      return action.selectedState
    default:
      return state
  }
}
const reducer = combineReducers({
  // vectorMap,
  selectedMap,
  // selectedYear,
  selectedCity,
  selectedState
})

export default reducer
