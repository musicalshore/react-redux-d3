import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
// import Tab from 'components/Tab'
import {MAPS, TOP_CITY} from 'constants/maps'
import './style.scss'

const Tab = ({ id, title, selectedMap, onTabClick }) => {
  let result

  if (id === TOP_CITY || (id !== TOP_CITY && parseInt(selectedMap.year) > 2013)) {
    result = <li role="tab" styleName={`${_.kebabCase(id)} ${selectedMap.id === id ? 'selected' : ''}`}
      onClickCapture={onTabClick}
      >
        <a href="#" onClick={onTabClick} styleName="title"><span>{title}</span></a>
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
  title: PropTypes.string.isRequired,
  selectedMap: PropTypes.object.isRequired,
  onTabClick: PropTypes.func.isRequired
}

const TabNav = class TabNav extends React.Component {
  constructor () {
    super()
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleTabClick ({id, rankingType}, e) {
    e.stopPropagation()
    let {selectedMap, onMapSelect} = this.props
    console.log('DATA', id, rankingType, selectedMap)
    onMapSelect({
      id,
      rankingType,
      year: selectedMap.year,
      stateFilter: selectedMap.stateFilter
    })
  }
  render () {
    let {selectedMap} = this.props
    return (
      <nav styleName="container" role="navigation">
        <ol role="tablist">
          {_.map(data => (
            <Tab key={data.id}
                {...data}
                selectedMap={selectedMap}
                onTabClick={_.partial(this.handleTabClick, [data])}
            />
          ), MAPS)}
        </ol>
      </nav>
    )
  }
}

TabNav.propTypes = {
  onMapSelect: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

export default TabNav
