import {string, object} from 'prop-types'
import React from 'react'

const ClaimsData = class ClaimsData extends React.Component {
  static propTypes = {
    selectedYear: string.isRequired,
    location: object.isRequired,
    type: string.isRequired
  }
  render () {
    const {location, type, selectedYear} = this.props
    let yearsBetweenClaims = ''
    let brakingEvents = ''
    let className = ''
    let title = ''

    switch (type) {
      case 'city':
        yearsBetweenClaims = location.rankings[`${selectedYear} Average Years Between Accidents`]
        brakingEvents = location.rankings[`${selectedYear} Braking Events per 1000 Miles (city)`]
        className = 'city-data-container'
        title = 'City data'
        break
      case 'suburban':
        yearsBetweenClaims = location.rankings[`${selectedYear} Years Between Accidents (Suburban Area only)`]
        brakingEvents = location.rankings[`${selectedYear} Suburban Braking Events per 1000 Miles`]
        className = 'suburban-data-container'
        title = 'Suburban Metro Area data'
        break
    }
    if (!yearsBetweenClaims && !brakingEvents) {
      return null
    }
    return (
      <div className={className}>
        <h5>{title}</h5>
        <div>{location.cityState}</div>
        {yearsBetweenClaims &&
          <div>Years between claims<sup>1</sup>: <span>{yearsBetweenClaims}</span></div>
        }
        {brakingEvents &&
          <div>Drivewise<sup>®</sup> hard-braking events per 1,000 miles<sup>2</sup>: <span>{brakingEvents}</span></div>
        }
      </div>
    )
  }
}

export default ClaimsData
