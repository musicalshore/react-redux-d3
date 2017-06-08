import React from 'react'
import PropTypes from 'prop-types'
import {ordinal} from 'utils'

const CityModalHeading = (props) => {
  let {selectedCity, selectedMap, onCitySelect, defaultYear, defaultMap} = props
  let message = ''
  let additionalClasses = ''

  const onClickClose = (e) => {
    e.preventDefault()
    if (window.lastFocus) {
      window.lastFocus.focus()
    }
    onCitySelect()
    e.stopPropagation()
  }
  const verb = selectedMap.year === defaultYear ? 'is' : 'was'
  const rankingType = selectedMap.id !== defaultMap ? ` by ${selectedMap.rankingType}` : ''

  if (selectedCity.rank === 1 && selectedMap.year === defaultYear) {
    additionalClasses += 'badge this-years-best'
    message = <span>This year&apos;s best!</span>
  } else if (selectedCity.mostImproved) {
    additionalClasses += 'badge most-improved'
    message = <span>Most improved!</span>
  } else if (selectedCity.newLocation) {
    additionalClasses += 'badge new-location'
    message = <span>New Addition!</span>
  } else {
    additionalClasses += 'no-badge'
    message = <span>{verb} the <b>{ordinal(selectedCity.rank, true)}</b> safest driving city in <b>{selectedMap.year}</b>{rankingType}.</span>
  }

  return (
    <div className={`city-modal-heading-container ${additionalClasses}`}>
      <div className="city-modal-city-container">
        <h2 className="city-name">{selectedCity.cityState}</h2>
        <div className="city-rank">{message}</div>
      </div>
      <div className="close" onClickCapture={onClickClose}>
        <div>Close</div>
        <div className="times">
          <a href="#" onClick={onClickClose}>&times;</a>
        </div>
      </div>
    </div>
  )
}

CityModalHeading.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object,
  onCitySelect: PropTypes.func.isRequired,
  defaultYear: PropTypes.string.isRequired,
  defaultMap: PropTypes.string.isRequired
}

export default CityModalHeading
