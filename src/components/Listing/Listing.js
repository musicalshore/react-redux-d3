import React from 'react'
import PropTypes from 'prop-types'
// import BEST_DRIVER_DATA from 'constants/bestDriver'
import _ from 'lodash/fp'
import { MAPS } from 'redux/constants'

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


const Listing = ({selectedMap, onCitySelect, selectedCity}) => {
  // const yearName = `${selectedMap.year} ${selectedMap.name}`
  // console.log('selectedMap++++', selectedMap, yearName);

  const rankingsByYearAndType = _.filter(ranking => !!ranking.rank, _.sortBy('rank', selectedMap.mapData.markers))
  console.log('rankingsByYearAndType ', rankingsByYearAndType)
  // const rankingsByYearName = selectedMap.mapData.markers
  // const filteredRankings = _.filter(ranking => !!ranking.rank, rankingsByYearAndType)
  const listItems = rankingsByYearAndType.map((ranking) => {
    return (
      <li key={ranking.rank} onClick={e => {
        console.log('ranking', ranking);
        onCitySelect(ranking)
      }}>
        <svg x="0px" y="0px" width="30px" height="44px" viewBox="0 0 30 44" enableBackground="new 0 0 30 44" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path fill="#0276A7" d="M28.898,16.164c0,7.659-13.867,24.65-13.867,24.65S1.167,23.822,1.167,16.164c0-7.658,6.208-13.866,13.864-13.866C22.689,2.298,28.898,8.505,28.898,16.164z" />
          <text textAnchor="middle" alignmentBaseline="middle" x="14.4" y="16" styleName="ranking">{ranking.rank}</text>
        </svg>
        <div styleName="cityState">{ranking.cityState}</div>
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
  selectedMap: PropTypes.object.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}


export default Listing
