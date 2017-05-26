
import React from 'react'
import Helmet from 'react-helmet'
import Breadcrumbs from 'components/Breadcrumbs'
import Banner from 'components/Banner'
// import $ from 'jquery'
import Report from 'containers/Report'

// import OpenGraph from './OpenGraph'
// import './global.css'
import './style.scss'

const App = () => (
  <div styleName="container">
    <Helmet title="America's Best Drivers Report" titleTemplate="Allstate %s">
      <html lang="en" />
      <meta charSet="utf-8" />
      <link rel="canonical" href="https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no"/>
      {/* <meta http-equiv="Pragma" content="no-cache" /> */}
      <meta name="keywords" content="best drivers, America's best drivers, best drivers in America, best U.S. drivers, 2016 America's best drivers report" />
      <meta name="description" content="Is your city home to the best drivers in America? Explore Allstate's annual best drivers report and interactive map." />

      { /* OpenGraph */ }
      <meta property="fb:app_id" content="51244333578" />
      <meta property="og:title" content="America's Best Driver Report" />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="http://allstate-abd.uat.thethinktank.com/img/share.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
      <script src="https://use.fontawesome.com/934103e5b8.js" />
    </Helmet>
    <div styleName="content">
        {/*<div styleName="flex-item">1</div>
        <div styleName="flex-item">2</div>
        <div styleName="flex-item">3</div>
        <div styleName="flex-item">4</div>*/}
          <Breadcrumbs />
          <Banner />
          <Report />
    </div>
  </div>
)

export default App
