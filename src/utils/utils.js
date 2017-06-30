import BEST_DRIVER_LOCATIONS_JSON from 'data/best-driver-locations-2017.json'
import PropTypes from 'prop-types'
import React from 'react'
import Promise from 'bluebird'
import {YEARS, DEFAULT_YEAR} from 'constants/maps'
import _ from 'lodash/fp'

export const Ordinal = ({number, sup = false}) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = number % 100
  const suffix = (s[(v - 20) % 10] || s[v] || s[0])
  if (sup) {
    return <span>{number}<sup>{suffix}</sup></span>
  } else {
    return <span>{number}{suffix}</span>
  }
}

Ordinal.propTypes = {
  number: PropTypes.number.isRequired,
  sup: PropTypes.bool
}

export const ordinal = (n, sup = false) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  const suffix = (s[(v - 20) % 10] || s[v] || s[0])
  if (sup) {
    return <span>{n}<sup>{suffix}</sup></span>
  } else {
    return <span>{n}{suffix}</span>
  }
}

export const filterByField = (data, value, field) => {
  const c = _.compact(_.pluck(field, data))
  if (_.isEmpty(c)) {
    throw new Error(`Field "${field}" does not exist in the collection.`)
  }
  const result = _.filter([field, value], data)
  return result
}

export const pickAndTrimStartsWith = (obj, prefix) => {
  let result = {}
  for (let prop in obj) {
    if (_.startsWith(prefix, prop)) {
      let key = _.trim(_.trimStart.convert({cap: false, fixed: false})(prop, prefix))
      result[key] = obj[prop]
    }
  }
  return result
}

export const mapLocationData = (years, locations) => _.map((location) => {
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
    result[year] = pickAndTrimStartsWith(location, year)
  }, years)

  return result
}, locations)
// const _locationData = mapLocationData(YEARS, BEST_DRIVER_JSON)
export const getLocationsByYear = (year, locationData = BEST_DRIVER_LOCATIONS_JSON) => {
  return _.reduce((result, location) => {
    let rankings = _.get(`${year}`, location)
    let currentYearRankings = _.get(`${DEFAULT_YEAR}`, location)
    let previousTopCities
    if (!rankings) {
      return result
    } else {
      previousTopCities = _.get('Top Cities', _.get(`${parseInt(year) - 1}`, location))
      if (previousTopCities) {
        rankings = _.extend(rankings, {'Previous Top Cities': previousTopCities})
      }
      if (currentYearRankings) {
        rankings = _.extend(rankings, {currentYearRankings})
      }
      return result.concat(_.extend(_.omit(YEARS, location), {rankings}))
    }
  }, [], locationData)
}

export const getLocationsByYearAndState = (year, stateFilter = '', locationData = BEST_DRIVER_LOCATIONS_JSON) => {
  if (!stateFilter || stateFilter === '') {
    throw new Error('State filter not provided.')
  }
  const locationsByYear = getLocationsByYear(year, locationData)
  const locationsByYearAndState = _.filter(['state', stateFilter], locationsByYear)
  return locationsByYearAndState
}
export const getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
