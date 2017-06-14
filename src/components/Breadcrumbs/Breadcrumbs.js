import './style.scss'

import React from 'react'

const Breadcrumbs = () => (
  <nav aria-label="Breadcrumb" styleName="container">
    <ol>
      <li styleName="breadcrumb">
        <a href="https://www.allstate.com/">Allstate</a>
      </li>
      <li styleName="breadcrumb">
        <a href="https://www.allstate.com/tools-and-resources.aspx">Tools &amp; Resources</a>
      </li>
      <li styleName="breadcrumb">
        <a aria-current="page" href="https://www.allstate.com/tools-and-resources/car-insurance.aspx">Car Insurance</a> &gt; America&apos;s Best Drivers
      </li>
    </ol>
  </nav>
)

export default Breadcrumbs
