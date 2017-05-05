import React from 'react'
import PropTypes from 'prop-types'
import Tab from 'components/Tab'
import './style.scss'

const tabs = [{
  // id: 'TOP_CITY',
  id: 'top-city',
  'data-byline': 'Explore which cities are least likely to experience collisions.',
  'data-type': '2016 Population Density',
  'data-color': '#e6527a',
  'data-selcolor': '#073F6E',
  'data-strokecolor': '#43c7ff',
  title: 'Top Cities'
}, {
  // id: 'DENSITY',
  id: 'density',
  'data-byline': 'See how precipitation (or lack thereof) impacts your city\'s ranking.',
  'data-type': '2016 Top Cities',
  'data-color': '#0096d6',
  'data-selcolor': '#073F6E',
  'data-strokecolor': '#ff9db8',
  title: 'Population Density'
}, {
  // id: 'RAIN_SNOW',
  id: 'rain-snow',
  'data-byline': 'See how precipitation (or lack thereof) impacts your city\'s ranking.',
  'data-type': '2016 Rain & Snow',
  'data-color': '#6d5dc9',
  'data-selcolor': '#342394',
  'data-strokecolor': '#a292ff',
  title: 'Rain & Snow'
}]
const TabNav = ({onTabClick, selectedMap, selectedYear}) => (
  <ul styleName="container">
    {tabs.map(tab =>
      <Tab key={tab.id} {...tab} onClick={() => onTabClick(tab.id)} selectedMap={selectedMap} selectedYear={selectedYear} />
    )}
  </ul>
)

TabNav.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object,
  selectedYear: PropTypes.string
}

export default TabNav
