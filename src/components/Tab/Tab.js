import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/fp'
import './style.scss'

const Tab = ({ id, title, selectedMap, onClick }) => {
  let isSelected = _.kebabCase(selectedMap.id) === id
  return (
    <div styleName={`container ${id} ${isSelected ? 'selected' : ''}`}
      onClick={e => {
        onClick()
      }}
    >
      <div styleName="title">{title}</div>
    </div>
  )
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default Tab

