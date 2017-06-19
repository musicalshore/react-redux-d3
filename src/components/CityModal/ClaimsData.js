import {string, object} from 'prop-types'
import React from 'react'

const ClaimsData = class ClaimsData extends React.Component {
  static propTypes = {
    selectedYear: string.isRequired,
    location: object.isRequired,
    type: string.isRequired
  }
  render () {
    const {location, type} = this.props
    let yearsBetweenClaims = ''
    let brakingEvents = ''
    let className = ''
    let title = ''

    switch (type) {
      case 'city':
        yearsBetweenClaims = location.rankings[`Average Years Between Accidents`] || 'N/A'
        brakingEvents = location.rankings[`Braking Events per 1000 Miles (city)`] || 'N/A'
        className = 'city-data-container'
        title = 'City data'
        break
      case 'suburban':
        yearsBetweenClaims = location.rankings[`Years Between Accidents (Suburban Area only)`] || 'N/A'
        brakingEvents = location.rankings[`Suburban Braking Events per 1000 Miles`] || 'N/A'
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
