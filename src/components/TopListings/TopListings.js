import _ from 'lodash/fp'
import React from 'react'
import {MAPS, DEFAULT_YEAR} from 'constants/maps'
import {func, string, array, bool} from 'prop-types'
import Listing from 'components/Listing'
import LocalCity from 'components/LocalCity'
import SocialShare from 'components/SocialShare'
import './style.scss'

const TopListings = class TopListings extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    selectedYear: string.isRequired,
    locations: array,
    selectedCity: string,
    onCitySelect: func.isRequired,
    cityState: string,
    modalIsOpen: bool.isRequired
  }

  render () {
    const {selectedMap, locations, selectedYear, selectedCity, onCitySelect, modalIsOpen} = this.props
    const rankingType = _.get('rankingType', _.find(['id', selectedMap], MAPS))
    const hasLocations = !!_.find(_.has(`rankings.${rankingType}`), locations)
    let additionalClasses = _.kebabCase(selectedMap)
    additionalClasses += !hasLocations ? ' disabled-map' : ''

    return (
      <div styleName="container">
        <div styleName={`heading ${additionalClasses}`}>
          <h4 styleName="year">{selectedYear}</h4>
          <h3 styleName="title">
            {_.get('title', _.find(['id', selectedMap], MAPS))}
          </h3>
          <p styleName="byline">
            {_.get('byline', _.find(['id', selectedMap], MAPS))}
          </p>
        </div>
        <If condition={hasLocations}>
          <Listing selectedMap={selectedMap}
            locations={locations}
            selectedCity={selectedCity}
            onCitySelect={onCitySelect}
          />
        </If>
        <If condition={selectedYear === DEFAULT_YEAR}>
          <div styleName="social-share">
            <SocialShare modalIsOpen={modalIsOpen} />
          </div>
        </If>
        <LocalCity selectedYear={selectedYear} cityState={this.props.cityState || ''} />
      </div>
    )
  }
}

export default TopListings
