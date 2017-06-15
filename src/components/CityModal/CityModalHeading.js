import {DEFAULT_MAP, DEFAULT_YEAR, MAPS} from 'constants/maps'
import _ from 'lodash/fp'
import {func, object, string} from 'prop-types'
import React from 'react'
import {Ordinal} from 'utils/utils'

const CityModalHeading = class CityModalHeading extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    selectedYear: string.isRequired,
    location: object,
    onToggleModal: func.isRequired
  }

  onClickClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.lastFocus) {
      window.lastFocus.focus()
    }
    this.props.onToggleModal()
  }

  render () {
    const {selectedYear, selectedMap, location} = this.props
    const rankingType = _.get('rankingType', _.find(['id', selectedMap], MAPS))
    const rank = _.get(`rankings.${rankingType}`, location)
    const verb = selectedYear === DEFAULT_YEAR ? 'is' : 'was'
    const clause = selectedMap !== DEFAULT_MAP ? ` by ${rankingType}` : ''
    let message = ''
    let additionalClasses = ''

    if (rank === 1 && selectedYear === DEFAULT_YEAR) {
      additionalClasses += 'badge this-years-best'
      message = <span>This year&apos;s best!</span>
    } else if (location.mostImproved) {
      additionalClasses += 'badge most-improved'
      message = <span>Most improved!</span>
    } else if (location.newLocation) {
      additionalClasses += 'badge new-location'
      message = <span>New Addition!</span>
    } else {
      additionalClasses += 'no-badge'
      message = <span>{verb} the <b><Ordinal number={rank} sup={true} /></b> safest driving city in <b>{selectedYear}</b>{clause}.</span>
    }

    return (
      <div className={`city-modal-heading-container ${additionalClasses}`}>
        <div className="city-modal-city-container">
          <h2 className="city-name">{location.cityState}</h2>
          <div className="city-rank">
            {message}
          </div>
        </div>
        <div className="close" onClickCapture={this.onClickClose}>
          <div>Close</div>
          <div className="times">
            <a href="#" onClick={this.onClickClose}>&times;</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CityModalHeading
