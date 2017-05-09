import { connect } from 'react-redux'
import _ from 'lodash/fp'
import VectorMap from 'components/VectorMap'
import VECTOR_MAPS from 'constants/vectorMaps'
import { selectCity } from 'redux/actions'
import bestDriverLocations from 'best-driver.json'
import { MAPS } from 'redux/constants'

// const marker = (location) => ({
//   name: location.City + ', ' + location.State,
//   latLng: [ location.Lat, location.Lon ],
//   rank: location.type,
//   dataObj: location
// })

const marker = _.curry((type, location) => ({
  name: location.City + ', ' + location.State,
  latLng: [ location.Lat, location.Lon ],
  rank: location[type],
  type: type
}))

const getMapData = ({selectedYear, selectedMap}) => {
  console.log('selectedMap', selectedMap)
  const type = selectedYear + ' ' + MAPS[selectedMap].type
  console.log('VECTOR_MAPS[type]', VECTOR_MAPS[selectedMap])
  const vectorMap = VECTOR_MAPS[selectedMap]
  // we need to reverse the order by rank so the larger markers are drawn over the smaller markers
  const rankingsByType = _.reverse(_.sortBy('rank', _.map(marker(type), bestDriverLocations)))
  const minTopTenRank = _.minBy('rank', rankingsByType).rank + 10
  console.log('minTopTenRank', minTopTenRank)

  const seriesValues = _.map((value) => {
    if (value.rank && value.rank < minTopTenRank) {
      return 'topTen'
    } else {
      return 'notTopTen'
    }
  }, rankingsByType)

  const mapData = _.merge(
    vectorMap, {
      markers: rankingsByType,
      series: {
        markers: [{
          values: seriesValues
        }]
      },
      labels: {
        markers: {
          render: function (rank) {
            return rankingsByType[parseInt(rank)].name
          }
        }
      }
    }
  )
  console.log('mapData', mapData)
  return mapData
}
const mapStateToProps = (state) => {
  return _.extend(state, {mapData: getMapData(state)})
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (selectedCity) => {
      console.log('onMarkerClick dispatch', selectedCity)
      dispatch(selectCity(selectedCity))
    }
  }
}

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(VectorMap)

export default Map

