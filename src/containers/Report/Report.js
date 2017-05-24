// import _ from 'lodash/fp'
import { connect } from 'react-redux'
import { selectMap, selectCity, filterState } from 'redux/actions'
import TabbedMap from 'components/TabbedMap'
// import bestDriverLocations from 'best-driver.json'
// import { MAPS } from 'redux/constants'
// import VECTOR_MAPS from 'constants/vectorMaps'

// const marker = _.curry((type, location) => ({
//   name: location.City + ', ' + location.State,
//   latLng: [ location.Lat, location.Lon ],
//   rank: location[type],
//   type: type
// }))

// const getMapData = ({selectedYear, selectedMap}) => {
//   console.log('selectedMap', selectedMap)
//   const type = selectedYear + ' ' + MAPS[selectedMap].type
//   console.log('VECTOR_MAPS[type]', VECTOR_MAPS[selectedMap])
//   const vectorMap = VECTOR_MAPS[selectedMap]
//   // we need to reverse the order by rank so the larger markers are drawn over the smaller markers
//   const rankingsByType = _.reverse(_.sortBy('rank', _.map(marker(type), bestDriverLocations)))
//   const minTopTenRank = _.minBy('rank', rankingsByType).rank + 10
//   console.log('minTopTenRank', minTopTenRank)

//   const seriesValues = _.map((value) => {
//     if (value.rank && value.rank < minTopTenRank) {
//       return 'topTen'
//     } else {
//       return 'notTopTen'
//     }
//   }, rankingsByType)
//   let markers = []
//   for (let i = 0; i < rankingsByType.length; i++) {
//     markers.push(_.extend(rankingsByType[i], {
//       index: i,
//       seriesValue: seriesValues[i]
//     }))
//   }

//   const mapData = _.merge(
//     vectorMap, {
//       markers: markers,
//       series: {
//         markers: [{
//           values: seriesValues
//         }]
//       },
//       labels: {
//         markers: {
//           render: function (rank) {
//             return rankingsByType[parseInt(rank)].name
//           }
//         }
//       }
//     }
//   )
//   console.log('mapData', mapData)
//   return mapData
// }

const mapStateToProps = (state) => {
  console.log('Report::mapStateToProps state', state, 'args', arguments)
  return {
    selectedMap: state.selectedMap,
    selectedCity: state.selectedCity,
    selectedState: state.selectedState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMapSelect: (selectedMap) => {
      // console.log('onTabClick dispatch', selectedMap)
      dispatch(selectMap(selectedMap))
    },
    onCitySelect: (selectedCity) => {
      dispatch(selectCity(selectedCity))
    },
    onFilterState: (stateFilter) => {
      dispatch(filterState(stateFilter))
    }
  }
}

const Report = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedMap)

export default Report

