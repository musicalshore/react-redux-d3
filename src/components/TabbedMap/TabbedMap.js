import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { selectMap } from 'actions'
import TabNav from 'components/TabNav'
import VectorMap from 'components/VectorMap'
import TopListings from 'components/TopListings'
import './style.scss'

const TabbedMap = ({ onTabClick, selectedMap, selectedYear }) => {
  return (
    <div styleName="container">
      <div styleName="maps">
        <TabNav onTabClick={onTabClick} selectedMap={selectedMap} selectedYear={selectedYear} />
        <VectorMap selectedMap={selectedMap} selectedYear={selectedYear} />
      </div>
      <div styleName="top-listings">
        <TopListings selectedMap={selectedMap} selectedYear={selectedYear} />
      </div>
    </div>
  )
}

TabbedMap.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  selectedYear: PropTypes.string
}

export default TabbedMap
