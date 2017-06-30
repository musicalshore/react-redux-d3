import './style.scss'

import Banner from 'components/Banner'
import Breadcrumbs from 'components/Breadcrumbs'
import React from 'react'
import Report from 'containers/Report'

const App = (props) => {
  return (
    <div styleName="container">
      <div styleName="content">
        <Breadcrumbs />
        <Banner />
        <div styleName="report-container">
          <Report {...props}/>
        </div>
      </div>
    </div>
  )
}

export default App
