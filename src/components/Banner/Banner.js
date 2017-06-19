import './style.scss'

import React from 'react'
import logo from './logo-large.png'

const alt = `Explore the 2017 Allstate America’s Best Drivers Report. Filter by year or state, then get a list of rankings by Top Cities, Population Density or Rain and Snow. Currently viewing:`
const Banner = () => (
  <header styleName="container">
    <img alt={alt} src={logo} />
  </header>
)

export default Banner
