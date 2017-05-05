import React from 'react'
import PropTypes from 'prop-types'
import locations from 'best-driver.json'
import _ from 'lodash'

import './style.scss'


const Listing = ({selectedYear, selectedMap}) => {
  let type = selectedYear + ' ' + selectedMap.type
  let sortedLocations = []
  let listItems = []

  sortedLocations = _.sortBy(locations, [type])
  console.log('sortedLocations', sortedLocations)
  listItems = sortedLocations.map((location, index) => {
    return (
      <li key={index}>
        <svg x="0px" y="0px" width="30px" height="44px" viewBox="0 0 30 44" enableBackground="new 0 0 30 44">
          <path fill="#0276A7" d="M28.898,16.164c0,7.659-13.867,24.65-13.867,24.65S1.167,23.822,1.167,16.164c0-7.658,6.208-13.866,13.864-13.866C22.689,2.298,28.898,8.505,28.898,16.164z" />
          <text textAnchor="middle" alignmentBaseline="middle" x="14.4" y="16" styleName="ranking">{location[type]}</text>
        </svg>
        <p>{location.City + ', ' + location.State}</p>
      </li>
    )
  })
  return (
    <ul styleName="container">
      {listItems}
    </ul>
  )
}

Listing.propTypes = {
  selectedMap: PropTypes.object,
  selectedYear: PropTypes.string
}


export default Listing
