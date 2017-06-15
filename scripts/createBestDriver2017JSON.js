/*
  NOTE: This script is obsolete. It was written to format the original 2017BestDriversFullData.json. Requests for changes by the client were made to ../src/data/best-driver-2017.json. Future modifications should be made to that file.
*/

const _ = require('lodash/fp')
const fs = require('fs')
const bestDriversFullData2017 = require('../json/2017BestDriversFullData')
const bestDriver2016 = require('../json/best-driver-2016')
const OUTPUT_FILE = '../json/best-driver-2017.json'
let index = 1
let mostImproved = null
let leastImproved = null
let needCoordinates = []
let normalizedCities = []
let newCities = []
// let results = []
const result = _.transform.convert({'immutable': false})((accumulator, value) => {
  let lastYearsData = _.find(city => {
    let cityMatch = _.getOr('', 'City', city).toUpperCase() === _.getOr('', 'City', value).toUpperCase()
    let stateMatch = _.getOr('', 'State', city).toUpperCase() === _.getOr('', 'State', value).toUpperCase()
    return cityMatch && stateMatch
  }, bestDriver2016)
  if (!lastYearsData && value['Change in Rank'] !== '') {
    let oldCity
    let newCity
    console.log(`No data for ${value.City}, ${value.State}, name changed...`, value)
    switch (value.City) {
      case 'NEW YORK':
        lastYearsData = _.find({City: 'New York City', State: value.State}, bestDriver2016)
        oldCity = value.City
        newCity = lastYearsData.City
        value.City = newCity
        break
      case 'BOISE CITY':
        lastYearsData = _.find({City: 'Boise', State: value.State}, bestDriver2016)
        oldCity = value.City
        newCity = lastYearsData.City
        value.City = newCity
        break
      case 'WEST VALLEY CITY':
        lastYearsData = _.find({City: 'West Valley', State: value.State}, bestDriver2016)
        oldCity = value.City
        newCity = lastYearsData.City
        value.City = newCity
        break
    }
    let data = {
      oldCity: oldCity,
      newCity: newCity,
      oldState: lastYearsData.State,
      newState: value.State
    }
    normalizedCities.push(data)
  }

  if (!lastYearsData && value['Change in Rank'] == '') {
    switch (value.City) {
      case 'MACON-BIBB COUNTY':
        value.Lat = 32.840
        value.Lon = -83.632
        console.log('MACON-BIBB COUNTY is new, added coordinates: ', value)
        break
    }
  }

  let result = {
    index,
    City: _.join(' ', _.map(_.capitalize, _.words(value['City']))),
    State: value['State'],
    '2017 Top Cities': value['ABD Rank (Frequency Only)'],
    '2017 Average Years Between Accidents': value['Estimated Years Between Accidents'],
    '2017 National Average Risk Relative to City Average': value['National Average Risk Relative to City Average'],
    '2017 Rain & Snow': value['Weather Rank'],
    '2017 Population Density': value['Population Density Rank'],
    '2017 Hard Braking Rank': value['Hard Braking Rank'],
    '2017 Braking Events per 1000 Miles (city)': value['Braking Events per 1000 Miles (city)'],
    'Metropolitan Area': value['Metropolitan Area'],
    '2017 Years Between Accidents (Suburban Area only)': value['Years Between Accidents (Suburban Area only)'],
    '2017 Suburban Braking Events per 1000 Miles': value['Suburban Braking Events per 1000 Miles'],
    '2017 Change': _.isInteger(value['Change in Rank']) ? value['Change in Rank'] : undefined,
    'Lat': value.Lat || undefined,
    'Lon': value.Lon || undefined
  }
  if (!mostImproved) {
    result['Most Improved'] = true
    mostImproved = result
  } else if (result['2017 Change'] > mostImproved['2017 Change']) {
    accumulator[mostImproved.index - 1]['Most Improved'] = undefined
    result['Most Improved'] = true
    mostImproved = result
  }

  if (!leastImproved) {
    result['Biggest Decrease'] = true
    leastImproved = result
  } else if (result['2017 Change'] < leastImproved['2017 Change']) {
    accumulator[leastImproved.index - 1]['Biggest Decrease'] = undefined
    result['Biggest Decrease'] = true
    leastImproved = result
  }
  if (!lastYearsData) {
    result['New Location'] = true
    newCities.push(result)
  } else if (lastYearsData) {
    let lastYearsRankings = _.pickBy((value, key) => {
      let re = /\d{4}\s(Population Density|Rain & Snow|Top Cities|Change|Average Years Between Accidents)/
      return re.test(key) && value !== -1 && value !== null
    }, lastYearsData)

    result = _.extend(result, lastYearsRankings)
    result = _.extend(result, _.pickBy((value, key) => /(Lat|Lon)/.test(key), lastYearsData))
  }
  if (!result.Lat) {
    needCoordinates.push(result)
  }
  accumulator.push(result)

  index++
}, [], bestDriversFullData2017)

fs.writeFile(OUTPUT_FILE, JSON.stringify(result), err => {
  if (err) throw err
  console.log(`

==> ${OUTPUT_FILE} has been saved <==

Results:

${mostImproved.City}, ${mostImproved.State} is most improved, with a change in rank of ${mostImproved['2017 Change']}

${leastImproved.City}, ${leastImproved.State} had the biggest decrease, with a change in rank of ${leastImproved['2017 Change']}
`)

  if (newCities.length) {
    console.log('The following cities are new and have added coordinates: ')
    _.each(city => {
      console.log(city.City + ', ' + city.State)
      console.log('Lat: ' + city.Lat + ' Lon: ' + city.Lon)
    }, newCities)
  }

  if (needCoordinates.length) {
    console.log('The following cities need coordinates:')
    _.each(city => { console.log(city.City + ', ' + city.State) }, needCoordinates)
  }

  if (normalizedCities.length) {
    console.log('\n' + 'The following locations were renamed:')
    _.each(data => {
      console.log('old: ' + data.oldCity + ', ' + data.oldState + ' new: ' + data.newCity + ', ' + data.newState)
    }, normalizedCities)
  }
})
