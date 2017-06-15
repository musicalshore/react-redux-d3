import './style.scss'

import React from 'react'

const Legend = () => {
  return (
    <div styleName="legend-container">
      <ul>
        <li><span styleName="blue">&bull;</span> Top Cities</li>
        <li><span styleName="yellow">&bull;</span> Most Improved</li>
        <li><span styleName="green">&bull;</span> New Additions</li>
      </ul>
    </div>
  )
}

export default Legend
