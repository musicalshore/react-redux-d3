import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/fp'
import './style.scss'

const CURRENT_YEAR = '2016'

const Modal = class Modal extends React.Component {

  cityState () {
    
  }
  render () {
    <div styleName="container">
      <div styleName="close"></div>
      <div class="cityContainer">
        <h2 class="cityName"></h2>
        <h2 class="cityRank">is the <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' '+type()])"></span> safest driving city <span class="densityLine">by Population Density
</span><span class="rainSnowLine">in Rain &amp; Snow</span></h2>
    <!-- /ko -->
    <!-- ko if: year() != '2016' -->
      <h2 class="cityRank">was the <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' '+type()])"></span> safest driving city <span class="densityLine">by Population Density
</span><span class="rainSnowLine">in Rain &amp; Snow</span> in <span class="year" data-bind="text: year"></span></h2>
    <!-- /ko -->
  </div>
  </div>
)

Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal
