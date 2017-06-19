import './style.scss'

import {array, bool, func, object, string, number} from 'prop-types'
import {TOP_CITY} from 'constants/maps'
import Choropleth from 'components/Choropleth'
import CityModal from 'components/CityModal'
import Legend from './Legend'
import MapSelector from 'components/MapSelector'
import React from 'react'
import TabNav from 'components/TabNav'
import TopListings from 'components/TopListings'

const TabbedMap = class TabbedMap extends React.Component {
  static propTypes = {
    error: object,
    locations: array,
    modalIsOpen: bool.isRequired,
    onToggleModal: func.isRequired,
    optionUSAState: string,
    optionYear: string.isRequired,
    selectedCity: string,
    selectedMap: string.isRequired,
    selectedUSAState: object,
    selectedYear: string.isRequired,
    zoomStep: number.isRequired,
    onMapSelect: func.isRequired,
    onCitySelect: func.isRequired,
    onUSAStateOption: func.isRequired,
    onYearOption: func.isRequired,
    onZoom: func.isRequired
  }
  getModalParent = () => {
    return document.querySelector('#app')
  }

  componentDidUpdate (prevProps, prevState) {
    const {selectedCity, modalIsOpen, onToggleModal} = this.props
    if ((prevProps.selectedCity !== selectedCity) && !modalIsOpen) {
      onToggleModal()
    }
  }

  render () {
    const {error, locations, modalIsOpen, optionUSAState, optionYear, selectedCity, selectedMap, selectedUSAState, selectedYear, zoomStep} = this.props
    const {onCitySelect, onMapSelect, onUSAStateOption, onYearOption, onToggleModal, onZoom} = this.props

    return (
      <div styleName="container">
        <MapSelector error={error}
          optionYear={optionYear}
          optionUSAState={optionUSAState}
          selectedMap={selectedMap}
          selectedYear={selectedYear}
          selectedUSAState={selectedUSAState}
          onMapSelect={onMapSelect}
          onYearOption={onYearOption}
          onUSAStateOption={onUSAStateOption}
        />
        <div styleName="map-container">
          <div styleName="maps">
            <TabNav selectedMap={selectedMap}
              selectedYear={selectedYear}
              selectedUSAState={selectedUSAState}
              locations={locations}
              onMapSelect={onMapSelect}
            />
            <Choropleth selectedMap={selectedMap}
              selectedYear={selectedYear}
              selectedCity={selectedCity}
              selectedUSAState={selectedUSAState}
              locations={locations}
              zoomStep={zoomStep}
              onCitySelect={onCitySelect}
              onZoom={onZoom}
              width={715}
              height={625}
            />
            {/* <div styleName="timeLine-SocialContainer">

              <div styleName="socialContainer">
                <div id="pageShare"></div>
              </div>
            </div> */}
          </div>
          <div styleName="top-listings">
            <TopListings selectedMap={selectedMap}
              locations={locations}
              selectedYear={selectedYear}
              selectedCity={selectedCity}
              onCitySelect={onCitySelect}
            />
          </div>
        </div>
        <div>
          <If condition={selectedMap === TOP_CITY}>
            <Legend />
          </If>
          {/* <ShareButton /> */}
        </div>
        <CityModal selectedMap={selectedMap}
          locations={locations}
          selectedCity={selectedCity}
          selectedYear={selectedYear}
          onCitySelect={onCitySelect}
          modalIsOpen={modalIsOpen}
          onToggleModal={onToggleModal}
        />
      </div>
    )
  }
}

export default TabbedMap
