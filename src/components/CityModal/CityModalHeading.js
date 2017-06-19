import {DEFAULT_MAP, DEFAULT_YEAR, MAPS, TOP_CITY} from 'constants/maps'
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
    let {mostImproved, newLocation} = location
    if (selectedYear === DEFAULT_YEAR && selectedMap === TOP_CITY) {
      if (rank === 1) {
        additionalClasses += 'badge this-years-best'
        message = <span>This year&apos;s best!</span>
      } else if (mostImproved) {
        additionalClasses += 'badge most-improved'
        message = <span>Most improved!</span>
      } else if (newLocation) {
        additionalClasses += 'badge new-location'
        message = <span>New Addition!</span>
      }
    }

    if (!((selectedYear === DEFAULT_YEAR && selectedMap === TOP_CITY) && (mostImproved || newLocation || rank === 1))) {
      additionalClasses += 'no-badge'
      message = <span>{verb} the <b><Ordinal number={rank} sup={true} /></b> safest driving city in <b>{selectedYear}</b>{clause}.</span>
    }

    return (
      <div className={`city-modal-heading-container ${additionalClasses}`}>
        <div className="city-modal-city-container">
          <h2 tabIndex="0" className="city-name">{location.cityState}</h2>
          <div tabIndex="0" className="city-rank">
            {message}
          </div>
        </div>
        <button type="button" aria-label="close modal" className="close" onClick={this.onClickClose}>
          <div>Close</div>
          <div className="times">
            &times;
          </div>
        </button>
      </div>
    )
  }
}

export default CityModalHeading
