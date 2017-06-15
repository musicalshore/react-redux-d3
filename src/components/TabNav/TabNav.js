import './style.scss'

import {MAPS} from 'constants/maps'
import _ from 'lodash/fp'
import {array, bool, func, string, object} from 'prop-types'
import React from 'react'
import {trackCustom_scLV} from 'utils/sitecatalyst' // eslint-disable-line camelcase

const Tab = class Tab extends React.Component {
  static propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    selectedMap: string.isRequired,
    hasLocations: bool.isRequired,
    onTabClick: func.isRequired
  }

  render () {
    const {id, title, hasLocations, selectedMap, onTabClick} = this.props
    let additionalClasses = selectedMap === id ? 'selected' : ''
    let isDisabled = false
    if (!hasLocations) {
      additionalClasses += ' disabled'
      isDisabled = true
    }

    return (
      <li role="tab" styleName={`${_.kebabCase(id)} ${additionalClasses}`}>
        <button type="button" onClick={onTabClick} styleName="title" disabled={isDisabled} aria-disabled={isDisabled}>
          <div>{title}</div>
          <If condition={isDisabled}>
            <div>No data available</div>
          </If>
        </button>
      </li>
    )
  }
}

const TabNav = class TabNav extends React.Component {
  static propTypes = {
    onMapSelect: func.isRequired,
    selectedMap: string.isRequired,
    selectedYear: string.isRequired,
    selectedUSAState: object,
    locations: array
  }

  handleTabClick = ({id, rankingType}, e) => {
    e.preventDefault()
    const {selectedYear, selectedUSAState, onMapSelect} = this.props
    trackCustom_scLV(rankingType)
    onMapSelect({
      id,
      rankingType,
      year: selectedYear,
      USAStateId: _.getOr('', 'id', selectedUSAState)
    })
  }
  render () {
    let {selectedMap, locations} = this.props
    const tabs = _.map(data => {
      const onTabClick = _.partial(this.handleTabClick, [data])
      const hasLocations = !!_.find(_.has(`rankings.${data.rankingType}`), locations)
      return (
        <Tab key={data.id}
          id={data.id}
          title={data.title}
          selectedMap={selectedMap}
          hasLocations={hasLocations}
          onTabClick={onTabClick}
        />
      )
    }, MAPS)
    return (
      <nav styleName="container" role="navigation">
        <ol role="tablist">
          {tabs}
        </ol>
      </nav>
    )
  }
}

export default TabNav
