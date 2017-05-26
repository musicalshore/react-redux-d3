import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
// import Tab from 'components/Tab'
import {MAPS, TOP_CITY} from 'constants/maps'
import './style.scss'

const Tab = ({ id, title, selectedMap, onClick }) => {
  // console.log('TAB:', id, title, selectedMap )
  const handleClick = e => {
    e.preventDefault()
    onClick()
  }
  let result
  console.log('TOP_CITY', TOP_CITY, selectedMap)
  if (id === TOP_CITY || (id !== TOP_CITY && parseInt(selectedMap.year) > 2015)) {
    result = <li role="tab" styleName={`${_.kebabCase(id)} ${selectedMap.id === id ? 'selected' : ''}`}
      onClick={handleClick}
      >
        <a href="#" onClick={handleClick} styleName="title"><span>{title}</span></a>
      </li>
  } else {
    result = <li styleName={`${_.kebabCase(id)} disabled`}>
      <div>
        <span>{title}</span>
        <span>No data available</span>
      </div>
    </li>
  }
  return result
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

const TabNav = ({onTabClick, selectedMap}) => {
  return (
    <nav styleName="container" role="navigation">
      <ol role="tablist">
        {_.map(data => (
          <Tab key={data.id}
              {...data}
              onClick={
                () => onTabClick(_.extend(data, {
                  year: selectedMap.year,
                  stateFilter: selectedMap.stateFilter
                }))
              }
              selectedMap={selectedMap}
          />
        ), MAPS)}
      </ol>
    </nav>
  )
}

TabNav.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

export default TabNav
