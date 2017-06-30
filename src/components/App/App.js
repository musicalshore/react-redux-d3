import './style.scss'

import Banner from 'components/Banner'
import Breadcrumbs from 'components/Breadcrumbs'
import Helmet from 'react-helmet'
import React from 'react'
import Report from 'containers/Report'
import {DEFAULT_SHARE_IMAGE_URL, SHARE_URL} from 'constants/socialMedia'

const App = (props) => {
  return (
    <div styleName="container">
      <Helmet>
        <meta property="og:title" content="America's Best Driver Report" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={DEFAULT_SHARE_IMAGE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:url" content={SHARE_URL} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="America's Best Driver Report" />
        <meta name="twitter:image" content="http://allstate-abd.uat.thethinktank.com/2017-delivery-test/img/ABD_FB_TW_LI.png" />
        <meta name="twitter:description" content="Is your city home to the best drivers in the U.S.? Allstate's annual America's #BestDriversReport has the answer." />
        <link rel="canonical" href={SHARE_URL} />
      </Helmet>
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
