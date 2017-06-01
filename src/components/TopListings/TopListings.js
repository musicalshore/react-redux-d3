import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Listing from 'components/Listing'
import './style.scss'

const TopListings = (props) => {
  console.log('PROPS', props);

  let { onCitySelect, selectedMap, selectedCity } = props
  let disabledMap = _.isNull(selectedMap.mapData) ? 'disabled-map' : ''
  return (
    <div styleName="container">
      <div styleName={`heading ${_.kebabCase(selectedMap.id)} ${disabledMap}`}>
        <h4 styleName="year">{ selectedMap.year }</h4>
        <h3 styleName="title">
          {selectedMap.id === 'TOP_CITY' && 'Top Cities'}
          {selectedMap.id === 'DENSITY' && 'Population Density'}
          {selectedMap.id === 'RAIN_SNOW' && 'Rain & Snow'}
        </h3>
        <p styleName="byline">
          {(selectedMap.id === 'TOP_CITY') && 'Explore which cities are least likely to experience collisions.'}
          {selectedMap.id === 'DENSITY' && 'See how population density impacts driving in your city.'}
          {selectedMap.id === 'RAIN_SNOW' && 'See how precipitation (or lack thereof) impacts your city\'s ranking.'}
        </p>
      </div>
      <Listing {...props} />
    </div>
  )
}
TopListings.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object
}

export default TopListings
