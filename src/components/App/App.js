import './style.scss'

import Banner from 'components/Banner'
import Breadcrumbs from 'components/Breadcrumbs'
// import Helmet from 'react-helmet'
import React from 'react'
import Report from 'containers/Report'
import {DEFAULT_SHARE_IMAGE_URL, SHARE_URL} from 'constants/socialMedia'

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
