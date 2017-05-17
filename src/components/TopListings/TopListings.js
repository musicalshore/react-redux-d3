import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Listing from 'components/Listing'
import './style.scss'

const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2014', '2015', '2016', '2017']


const TopListings = ({ onChange, selectedMap, selectedYear, selectedCity }) => (
  <div styleName="container">
    <div styleName={`heading ${_.kebabCase(selectedMap)}`}>
      <h4 styleName="year">{ selectedYear }</h4>
      <h3 styleName="title">
        {selectedMap === 'TOP_CITY' && 'Top Cities'}
        {selectedMap === 'DENSITY' && 'Population Density'}
        {selectedMap === 'RAIN_SNOW' && 'Rain & Snow'}
      </h3>
      <p styleName="byline">
        {(selectedMap === 'TOP_CITY') && 'Explore which cities are least likely to experience collisions.'}
        {selectedMap === 'DENSITY' && 'See how population density impacts driving in your city.'}
        {selectedMap === 'RAIN_SNOW' && 'See how precipitation (or lack thereof) impacts your city\'s ranking.'}
      </p>
    </div>
    <Listing selectedMap={selectedMap} selectedYear={selectedYear} selectedCity={selectedCity}/>
  </div>
)

TopListings.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMap: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCity: PropTypes.string
}

export default TopListings
