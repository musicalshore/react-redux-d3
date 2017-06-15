import _ from 'lodash/fp'
import React from 'react'
import {array, func, bool, string} from 'prop-types'
import Modal from 'react-modal'
import CityModalHeading from './CityModalHeading'
import Rankings from './Rankings'
import ClaimsData from './ClaimsData'
import Footnotes from './Footnotes'
import './style.scss'

const CityModal = class CityModal extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    selectedCity: string,
    selectedYear: string.isRequired,
    onCitySelect: func.isRequired,
    modalIsOpen: bool.isRequired,
    locations: array,
    onToggleModal: func.isRequired
  }

  onRequestClose = (e) => {
    console.log('onRequestClose: ', e)
    e.preventDefault()

    this.props.onToggleModal()
    e.stopPropagation()
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.modalIsOpen !== this.props.modalIsOpen)
  }

  render () {
    const {selectedMap, modalIsOpen, selectedCity, selectedYear, locations, onToggleModal} = this.props
    const location = _.find(['cityState', selectedCity], locations)
    if (!modalIsOpen) {
      return null
    } else {
      return (
        <div>
          <Modal isOpen={modalIsOpen}
            onRequestClose={this.onRequestClose}
            contentLabel="City Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
          >
            <div className={`city-modal-container ${_.kebabCase(selectedMap)}`}>
              <CityModalHeading selectedMap={selectedMap}
                selectedCity={selectedCity}
                selectedYear={selectedYear}
                location={location}
                onToggleModal={onToggleModal}
              />
              <Rankings selectedYear={selectedYear}
                location={location}
              />
              <div className="additional-data">
                <ClaimsData type="city" selectedYear={selectedYear}
                  location={location}
                />
                <ClaimsData type="suburban" selectedYear={selectedYear}
                  location={location}
                />
              </div>
              <Footnotes />
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default CityModal
