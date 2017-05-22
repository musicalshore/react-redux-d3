import React from 'react'
// import Img from 'components/Img'
import desktopHeader from './desktop-header.png'
import mobileHeader from './mobile-header.png'
import './style.scss'

const Banner = () => (
  <div styleName="container">
      <img styleName="desktop-header" alt="Explore the America's Best Drivers Report to see the top safe driving cities" src={desktopHeader} />
      <img styleName="mobile-header" alt="Explore the America's Best Drivers Report to see the top safe driving cities" src={mobileHeader} />
  </div>
)

export default Banner
