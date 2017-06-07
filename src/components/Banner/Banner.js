import React from 'react'
// import Img from 'components/Img'
import desktopHeader from './desktop-header.png'
import mobileHeader from './mobile-header.png'
import mobileLogo from './mobile-logo.png'
import './style.scss'

const alt = `Explore the 2017 Allstate America’s Best Drivers Report. Filter by year or state, then get a list of rankings by Top Cities, Population Density or Rain and Snow. Currently viewing:`
const Banner = () => (
  <header styleName="container">
      {/*<img styleName="desktop-header" alt={alt} src={desktopHeader} /> */ }
      <img styleName="desktop-and-tablet-header" alt={alt} src={desktopHeader} />
      <img styleName="mobile-logo" alt={alt} src={mobileLogo} />
  </header>
)

export default Banner
