import React from 'react'
import PropTypes from 'prop-types'

const CityData = (props) => {
  let {selectedCity, selectedMap} = props
  const yearsBetweenClaims = selectedCity[`${selectedMap.year} Average Years Between Accidents`]
  const brakingEvents = selectedCity[`${selectedMap.year} Braking Events per 1000 Miles (city)`]
  if (!yearsBetweenClaims && !brakingEvents) {
    return <div/>
  }
  return (
    <div className="city-data-container">
      <h5>City data</h5>
      <div>{selectedCity.cityState}</div>
      {yearsBetweenClaims &&
        <div>Years between claims<sup>1</sup>: <span>{yearsBetweenClaims}</span></div>
      }
      {brakingEvents &&
        <div>Drivewise<sup>®</sup> braking events per 1,000 miles<sup>2</sup>: <span>{brakingEvents}</span></div>
      }
    </div>
  )
}


CityData.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}

export default CityData
