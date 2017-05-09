import React from 'react'
import PropTypes from 'prop-types'
import Listing from 'components/Listing'
import _ from 'lodash/fp'
import './style.scss'

const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2014', '2015', '2016', '2017']
// styleName={`container ${id} ${isSelected ? 'selected' : ''}`}

const Message = ({selectedMap}) => {
  if (selectedMap === 'TOP_CITY') {
    return <p>Explore which cities are least likely to experience collisions.</p>
  } else if (selectedMap === 'DENSITY') {
    return <p>Explore which cities are least likely to experience collisions.</p>
  } else if (selectedMap === 'RAIN_SNOW') {
    return <p>See how precipitation (or lack thereof) impacts your city's ranking.</p>
  }
}

const Title = ({selectedMap}) => {
  if (selectedMap === 'TOP_CITY') {
    return <h3>Top Cities</h3>
  } else if (selectedMap === 'DENSITY') {
    return <h3>Population Density</h3>
  } else if (selectedMap === 'RAIN_SNOW') {
    return <h3>Rain & Snow</h3>
  }
}

const TopListings = ({ onChange, selectedMap, selectedYear, selectedCity }) => (
  <div styleName="container">
    <div styleName={`heading ${_.kebabCase(selectedMap)}`}>
      <div styleName="icon" />
      <div>
        <h4>{ selectedYear }</h4>
        <Title selectedMap={selectedMap} />
        <Message selectedMap={selectedMap} />
      </div>
    </div>
    {selectedMap === 'TOP_CITY' &&
      <div styleName="year-selector">
        <div>Select year:</div>
        <select value={selectedYear} onChange={e => onChange(e.target.value)}>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    }
    <Listing selectedMap={selectedMap} selectedYear={selectedYear} selectedCity={selectedCity}/>

  </div>
)

TopListings.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMap: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCity: PropTypes.string.isRequired
}

export default TopListings
