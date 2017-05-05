import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Tab = ({ id, title, selectedMap, selectedYear, onClick }) => (
  <li styleName="container" className={'tab ' + id + (selectedMap === id ? ' selected' : '')}
    onClick={e => {
      console.log('--clicked tab: selectedMap', selectedMap, ' selectedYear ', selectedYear)
      onClick()
    }}
  >
    <div styleName="title">{title}</div>
    <div styleName="bottom-color" />
  </li>
)

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object,
  selectedYear: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default Tab

