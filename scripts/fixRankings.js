const _ = require('lodash/fp')
const fs = require('fs')
const JSON_2016 = require('../json/best-driver-2016.json')
const JSON_2017 = require('../json/best-driver-locations.json')
const OUTPUT_FILE = '../json/best-driver-locations-fixed-rankings-2017.json'

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
      // console.log('city', obj, ' key: ', key, 'prop', prop)
      let val = _.get(prop, obj)
      // console.log('val', val)

      if (!_.isNull(val) && val !== -1 && val !== '') {
        result[key] = val
        // console.log('result[key]', result[key])
      } else {
        // console.log('obj[prop]', obj[prop])
      }
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
      // console.log('ranking: ', ranking)
      if (!_.isEmpty(ranking)) {
        result[year] = ranking
      }
    }, years)

    return result
  }, locations)
}
function fixRankings () {
  let matches = []
  let orphans = []
  let results = []
  _.each((location) => {
    let braking2016 = _.get('2016 Braking Events', location)
    let braking2015 = _.get('2015 Braking Events', location)
    let Lat = _.get('Lat', location)
    let Lon = _.get('Lon', location)
    let obj = _.find((o) => {
      return o.lngLat[0] === Lon && o.lngLat[1] === Lat
    }, JSON_2017)
    if (!obj) {
      // console.log('Can\'t find Lon: ', Lon, ' Lat: ', Lat, ' City: ', location.City, ' State: ', location.State)
      orphans.push(location)
    } else {
      let result = {}
      if (braking2016) {
        result = _.merge(obj, { '2016': {
          'Braking Events per 1000 Miles (city)': braking2016
        }})
      } else {
        result = _.extend(result, obj)
      }
      if (braking2015) {
        result = _.merge(result, { '2015': {
          'Braking Events per 1000 Miles (city)': braking2016
        }})
      }
      matches.push(result)
    }
  }, JSON_2016)
  _.each((o) => {
    let obj = _.find(['cityState', o.cityState], matches)
    if (obj) {
      results.push(obj)
    } else {
      results.push(o)
    }
  }, JSON_2017)
  console.log('Results before', results.length)
  console.log('orphans ', orphans.length)
  let mappedOrphans = mapLocationData(YEARS, orphans)
  console.log('mappedOrphans ', mappedOrphans.length)
  results = results.concat(mappedOrphans)
  console.log('Results after:', results.length)
  return results
}

const result = fixRankings()

fs.writeFile(OUTPUT_FILE, JSON.stringify(result), err => {
  if (err) {
    console.log('ERROR: ', err)
  }
})
