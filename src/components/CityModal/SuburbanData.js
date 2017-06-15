import {object, string} from 'prop-types'
import React from 'react'

const SuburbanData = class SuburbanData extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    selectedYear: string.isRequired,
    location: object.isRequired
  }
  render () {
    const {location, selectedYear, selectedMap} = this.props
    const yearsBetweenClaims = selectedCity[`${selectedMap.year} Years Between Accidents (Suburban Area only)`]
    const brakingEvents = selectedCity[`${selectedMap.year} Suburban Braking Events per 1000 Miles`]
    if (!yearsBetweenClaims && !brakingEvents) {
      return <div/>
    }
    return (
      <div className="suburban-data-container">
        <h5>Suburban Metro Area data</h5>
        <div>{selectedCity.metropolitanArea}</div>
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

SuburbanData.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}

export default SuburbanData
