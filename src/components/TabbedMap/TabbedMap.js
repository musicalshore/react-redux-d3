import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider/lib/Slider'

import 'rc-slider/assets/index.css'
import Modal from 'react-modal'
// import { connect } from 'react-redux'
// import { selectMap } from 'actions'
import TabNav from 'components/TabNav'
import Map from 'containers/Map'
import TopListings from 'components/TopListings'
import style from './style.scss'

const modalStyle = {
  overlay: {
    backgroundColor: '#808080'
  },
  content: {
    display: 'flex',
    top: '25%',
    left: '25%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
const TabbedMap = class TabbedMap extends React.Component {
  constructor () {
    super()
    this.state = { modalIsOpen: false }
    this.zoomBar = this.zoomBar.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
    // this.$el = $(this.el)
    // this.$el.somePlugin()
  }

  zoomBar (el) {
    this.el = el
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  render () {
    return (
      <div styleName="style.container">
        <div styleName="style.maps">
          <TabNav onTabClick={this.props.onTabClick} selectedMap={this.props.selectedMap} selectedYear={this.props.selectedYear} />
          <Map onCityChange={this.props.onCityChange} />
          {/*<Slider styleName="style.slider" vertical="true"/> */}
          {/*<div styleName="style.zoom-bar-wrapper">
            <div ref={this.zoomBar}>
              <div styleName="style.zoom-tick"></div>
              <div styleName="style.zoom-tick"></div>
              <div styleName="style.zoom-tick"></div>
              <div styleName="style.zoom-tick"></div>
              <div styleName="style.zoom-ball"></div>
            </div>
          </div> */}
        </div>
        <div styleName="style.top-listings">
          <TopListings onChange={this.props.onYearChange} selectedMap={this.props.selectedMap} selectedYear={this.props.selectedYear} selectedCity={this.props.selectedCity} />
        </div>
        <Modal isOpen={this.state.modalIsOpen} style={modalStyle} />
      </div>
    )
  }
}

TabbedMap.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  selectedMap: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCity: PropTypes.string
}

export default TabbedMap
