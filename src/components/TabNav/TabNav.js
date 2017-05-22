import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Tab from 'components/Tab'
import {MAPS} from 'constants/maps'
import './style.scss'

const TabNav = ({onTabClick, selectedMap}) => {
  return (
    <div styleName="container">
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
    </div>
  )
}

TabNav.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

export default TabNav
