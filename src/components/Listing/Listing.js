import React from 'react'
import PropTypes from 'prop-types'
// import BEST_DRIVER_DATA from 'constants/bestDriver'
import _ from 'lodash/fp'
import { MAPS } from 'constants/maps'

import './style.scss'
// const ranking = _.curry((year, rankingType, location) => ({
//   name: location.City + ', ' + location.State,
//   latLng: [ location.Lat, location.Lon ],
//   rank: location[type],
//   type: type
// }))

const ranking = _.curry((year, rankingType, location) => _.extend({
  rank: location[`${year} ${rankingType}`],
  rankingType: rankingType
}, location))


const ListItem = ({rank, cityState, onClick}) => {
  return (
    <li onClick={onClick}>
      <svg width="30" height="30">
        <g>
          <circle cx="15" cy="15" r="15" />
          <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{rank}</text>
        </g>
      </svg>
      <div styleName="cityState">{cityState}</div>
    </li>
  )
}

const Listing = ({selectedMap, onCitySelect, selectedCity}) => {
  // const rankingsByYearAndType = _.filter(ranking => !!ranking.rank, _.sortBy('rank', selectedMap.mapData.markers))
  // console.log('rankingsByYearAndType ', rankingsByYearAndType)
  // const rankingsByYearName = selectedMap.mapData.markers
  // const filteredRankings = _.filter(ranking => !!ranking.rank, rankingsByYearAndType)
  const listItems = _.map(ranking => <ListItem key={ranking.rank} {...ranking} onClick={() => onCitySelect(ranking)} />, _.sortBy('rank', selectedMap.mapData.markers))

  return (
    <div styleName="container">
      <div styleName="instructions">
        Select city for more data.
      </div>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

ListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  cityState: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

Listing.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}


export default Listing
