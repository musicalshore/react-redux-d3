import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import CityModalHeading from './CityModalHeading'
import Rankings from './Rankings'
import CityData from './CityData'
import SuburbanData from './SuburbanData'
import Footnotes from './Footnotes'
import './style.scss'

const CityModal = class CityModal extends React.Component {
  constructor () {
    super()
    this.onAfterOpen = this.onAfterOpen.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
  }

  onAfterOpen () {
    // $(this.modal).parent().addClass('city-modal-full-width')
    // this.modal.parentNode.style.width = '100%'
    // $(this.modal).animate('city-modal-full-width')
  }

  onRequestClose () {
    // $(this.modal).removeClass('city-modal-full-width')
    // this.modal.parentNode.style.width = '0'
    this.props.onCitySelect(null)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('nextProps', nextProps, 'this.props', this.props)
    if (nextProps.modalIsOpen !== this.props.modalIsOpen) {
      return true
    } else {
      return false
    }
  }

  render () {
    const props = this.props
    let {selectedMap, modalIsOpen} = props
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
            <div className={`city-modal-container ${_.kebabCase(selectedMap.id)}`}>
              <CityModalHeading {...props} />
              <Rankings {...props} />
              <div className="additional-data">
                <CityData {...props} />
                <SuburbanData {...props} />
              </div>
              <Footnotes />
            </div>
          </Modal>
        </div>
      )
    }
  }
}

CityModal.propTypes = {
  selectedMap: PropTypes.object,
  selectedCity: PropTypes.object,
  onCitySelect: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  defaultYear: PropTypes.string,
  defaultMap: PropTypes.string
}

export default CityModal
