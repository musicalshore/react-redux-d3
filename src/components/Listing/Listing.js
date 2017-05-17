import React from 'react'
import PropTypes from 'prop-types'
import bestDriverLocations from 'best-driver.json'
import _ from 'lodash/fp'
import { MAPS } from 'redux/constants'

import './style.scss'
const ranking = _.curry((type, location) => ({
  name: location.City + ', ' + location.State,
  latLng: [ location.Lat, location.Lon ],
  rank: location[type],
  type: type
}))


const Listing = ({onCitySelect, selectedYear, selectedMap}) => {
  const type = selectedYear + ' ' + MAPS[selectedMap].type
  const rankingsByType = _.sortBy('rank', _.map(ranking(type), bestDriverLocations))
  const filteredRankings = _.filter(ranking => !!ranking.rank, rankingsByType)
  const listItems = filteredRankings.map((ranking) => {
    return (
      <li key={ranking.rank} onClick={e => {
        console.log('ranking', ranking);
        onCitySelect(ranking)
      }}>
        <svg x="0px" y="0px" width="30px" height="44px" viewBox="0 0 30 44" enableBackground="new 0 0 30 44" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path fill="#0276A7" d="M28.898,16.164c0,7.659-13.867,24.65-13.867,24.65S1.167,23.822,1.167,16.164c0-7.658,6.208-13.866,13.864-13.866C22.689,2.298,28.898,8.505,28.898,16.164z" />
          <text textAnchor="middle" alignmentBaseline="middle" x="14.4" y="16" styleName="ranking">{ranking.rank}</text>
        </svg>
        <div styleName="cityState">{ranking.name}</div>
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
  selectedMap: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCity: PropTypes.object
}


export default Listing
