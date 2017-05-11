import _ from 'lodash/fp'
import BEST_DRIVER_LOCATIONS from 'constants/best-driver.json'
import MAPS from 'constants/maps'

const MAX_TOP_CITIES = 10

const createMarker = _.curry((mapName, location) => ({
  name: location.City + ', ' + location.State,
  latLng: [ location.Lat, location.Lon ],
  rank: location[mapName],
  mapName
}))

const getMarkers = (mapName) => {
  // we need to reverse the order by rank so the larger SVG markers are drawn over the smaller markers
  const markers = _.reverse(_.sortBy('rank', _.map(createMarker(mapName), BEST_DRIVER_LOCATIONS)))

  return markers
}

const getDataSeries = (markers) => {
  const highestRankedCity = _.minBy('rank', _.sortBy('rank', markers))
  const maxTopCities = highestRankedCity.rank + MAX_TOP_CITIES
  const dataSeries = _.map(marker => {
    // handle cases where rank is null or data is weird
    if (_.isNumber(marker.rank) && marker.rank > 0 && marker.rank < maxTopCities) {
      return 'topTen'
    } else {
      return 'notTopTen'
    }
  }, markers)

  return dataSeries
}

const getSeriesValues = markers => ({
  series: {
    markers: [{
      values: getDataSeries(markers)
    }]
  }
})

export const getMapDataByIdAndYear = (id, year) => {
  const mapName = `${year} ${MAPS[id].type}`
  const markers = getMarkers(mapName)
  const seriesValues = getSeriesValues(markers)
  let markersWithSeriesInfo = []
  for (let i = 0; i < markers.length; i++) {
    console.log('______', _.extend(markers[i], {
      index: i,
      seriesValue: seriesValues.markers[0].values[i]
    }))
    markersWithSeriesInfo.push(_.extend(markers[i], {
      index: i,
      seriesValue: seriesValues.markers[0].values[i]
    }))
  }

  console.log('markers,series', markers, seriesValues)
  const mapData = {
    // mapType: yearAndType,
    markers: markersWithSeriesInfo,
    series: {
      markers: [{
        values: seriesValues
      }]
    }
  }

  return mapData
}
