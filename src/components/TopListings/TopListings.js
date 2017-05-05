import React from 'react'
import PropTypes from 'prop-types'
import Listing from 'components/Listing'

import './style.scss'

const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2014', '2015', '2016', '2017']


const TopListings = ({ selectedMap, selectedYear }) => (
  <div styleName="container">
    <div styleName="heading" className={selectedMap.id}>
      <div styleName="icon" />
      <h4>{ selectedYear }</h4>
      <h3>{ selectedMap.type }</h3>
    </div>
    {selectedMap.id === 'top-city' &&
      <div styleName="year-selector">
        <div>Select year:</div>
        <select value={selectedYear}>
          {years.map(year => <option key={year} value={year} />)}
        </select>
      </div>
    }
    <Listing selectedMap={selectedMap} selectedYear={selectedYear} />

  </div>
)

TopListings.propTypes = {
  selectedMap: PropTypes.object,
  selectedYear: PropTypes.string
}

export default TopListings
