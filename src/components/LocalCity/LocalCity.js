import _ from 'lodash/fp'
import React from 'react'
import {string} from 'prop-types'
import './style.scss'
import {Ordinal, getLocationsByYear} from 'utils/utils'

const LocalCity = class LocalCity extends React.Component {
  static propTypes = {
    cityState: string.isRequired,
    selectedYear: string.isRequired
  }

  render () {
    const locations = getLocationsByYear(this.props.selectedYear)
    const location = _.find(['cityState', this.props.cityState], locations)
    const rank = _.get('Top Cities', location.rankings)
    return (
      <div styleName="local-city-container">
        <div styleName="local-city">
          {location.cityState} <span>(edit)</span>
        </div>
        <div styleName="local-city-rank">
          is the <Ordinal number={rank} sup={true} /> safest driving city.
        </div>
      </div>
    )
  }
}

export default LocalCity
