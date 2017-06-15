
const _ = require('lodash/fp')
const fs = require('fs')
const BEST_DRIVER_JSON = require('../json/best-driver-2017.json')
const OUTPUT_FILE = '../json/best-driver-locations-2017.json'

const YEARS = [
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017'
]
function pickAndTrimStartsWith (obj, prefix) {
  let result = {}
  for (let prop in obj) {
    if (_.startsWith(prefix, prop)) {
      let key = _.trim(_.trimStart.convert({cap: false, fixed: false})(prop, prefix))
      result[key] = obj[prop]
    }
  }
  return result
}
function mapLocationData (years, locations) {
  return _.map((location) => {
    let result = {
      cityState: `${location.City}, ${location.State}`,
      city: location.City,
      state: location.State,
      lngLat: [ location.Lon, location.Lat ],
      newLocation: location['New Location'] || false,
      mostImproved: location['Most Improved'] || false,
      biggestDecrease: location['Biggest Decrease'] || false,
      metropolitanArea: location['Metropolitan Area']
    }
    _.each((year) => {
      const ranking = pickAndTrimStartsWith(location, year)
      result[year] = _.isEmpty(ranking) ? undefined : pickAndTrimStartsWith(location, year)
    }, years)

    return result
  }, locations)
}

const result = mapLocationData(YEARS, BEST_DRIVER_JSON)
fs.writeFile(OUTPUT_FILE, JSON.stringify(result), err => {
  if (err) {
    console.log('ERROR: ', err)
  }
})
