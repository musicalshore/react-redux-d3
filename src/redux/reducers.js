import _ from 'lodash/fp'
import {combineReducers} from 'redux'
import {MAPS, DEFAULT_MAP, DEFAULT_YEAR, YEARS, US_STATES} from 'constants/maps'
import {SELECT_MAP, SELECT_CITY, FILTER_STATE, SELECT_YEAR_OPTION, SELECT_STATE_OPTION} from 'constants/actionTypes'
import BEST_DRIVER_DATA from 'constants/bestDriver'

// const marker = _.curry((year, rankingType, location) => _.extend({
//   rank: location[`${year} ${rankingType}`],
//   rankingType: rankingType
// }, location))

export const getMapData = ({year, rankingType, stateFilter = null}) => {
  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers

  const bestDriverData = stateFilter.length && stateFilter !== 'All' ? _.filter(['State', stateFilter], BEST_DRIVER_DATA) : BEST_DRIVER_DATA
  const locations = _.reduce((result, location) => {
    const rank = location[`${year} ${rankingType}`]
    if (rank) {
      return _.concat(result, _.extend({
        rank,
        rankingType
      }, location))
    } else {
      return result
    }
  }, [], bestDriverData)
  // const markers = _.map(marker(year, rankingType))
  if (!locations.length) {
    return null
  } else {
    const rankingsByYearAndType = _.flow([
      _.filter('rank'),
      _.sortBy('rank'),
      _.reverse
    ])(locations)

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
}

export const getSafeCityData = (year, usState) => {
  let name = _.get('name', _.find(['id', usState], US_STATES))
  // console.log("++++++++name ", name);
  let stateData = _.filter(['State', usState], BEST_DRIVER_DATA)
  // console.log("+++++stateData ", stateData);
  // console.log('((((((((', _.filter(`${year} Top Cities`, stateData));

  let safeCityCount = _.size(_.filter(`${year} Top Cities`, stateData))
  // console.log('SAFECITYCOUNT', safeCityCount);
  const safeCityData = {
    safeCityCount,
    name
  }
  // console.log('safeCityData', safeCityData);
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
      // console.log("********SELECT_MAP ", selectedMap);

      mapData = getMapData(selectedMap)
      selectedMap = _.extend(selectedMap, {mapData})
      // if (_.isNull(mapData)) {
      //   selectedMap = _.extendAll([selectedMap, defaultMap, {
      //     year: state.year,
      //     stateFilter: ''
      //   }])
      //   selectedMap = _.extend(selectedMap, {
      //     mapData: getMapData(selectedMap)
      //   })
      //   console.log("********NEW SELECT_MAP ", selectedMap);
      //   return selectedMap
      // }
      if (selectedMap.stateFilter !== '' && !_.isNull(mapData)) {
        safeCityData = getSafeCityData(selectedMap.year, selectedMap.stateFilter)
      }
      selectedMap = _.extend(selectedMap, {safeCityData})
      // console.log('RESULT', selectedMap);

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
      return _.extend(state, action.selectedCity)
    default:
      return state
  }
}

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
      const id = _.get('selectedMap.id', action)
      const year = parseInt(_.getOr(0, 'selectedMap.year', action))
      let error
      // console.log('ERRORMESSAGE', id, year, action);
      if ((id === 'DENSITY' || id === 'RAIN_SNOW') && year < 2014) {
        error = 'No data found. Please select a different year, state or filter.'
      } else {
        error = ''
      }
      // console.log('ERRORMESSAGE:', error);
      return error
    default:
      return state
  }
}
// const disableOtherMaps = (state = false, action) => {
//   switch (action.type) {
//     case SELECT_MAP:
//       let disableOtherMaps
//       let mapData = getMapData(action.selectedMap)
//       console.log('disableOtherMaps action map', action, mapData)
//       if (_.isNull(mapData)) {
//         disableOtherMaps = true
//       } else {
//         disableOtherMaps = false
//       }
//       console.log('disableOtherMaps true', disableOtherMaps)
//       return disableOtherMaps
//     default:
//       return state
//   }
// }
// const mapSelector = (state = {year: DEFAULT_YEAR, usState: ''}, action) => {
//   let {year, usState} = action
//   let safeCityData = {}
//   switch (action.type) {
//     case CHANGE_MAP_SELECTOR:
//       if (usState !== '') {
//         safeCityData = getSafeCityData({year, usState})
//       }
//       return _.extend({year, usState}, safeCityData)
//     default:
//       return state
//   }
// }

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
  // disableOtherMaps
  // mapSelector
})

export default reducer
