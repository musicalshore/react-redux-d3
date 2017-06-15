import './style.scss'
import factCollision from './fact-collision10Years-top.png'
import fact26 from './fact-26-bottom.png'
import React from 'react'
import {trackCustom_tl} from 'utils/sitecatalyst' // eslint-disable-line

const Comments = class Comments extends React.Component {
  render () {
    return (
      <div styleName="comment-container">
        <p>
          <span styleName="hide">Allstate is committed to helping people across the nation protect what matters most. </span>The Allstate America&apos;s Best Drivers Report<sup>&reg;</sup> is an annual ranking that identifies which of the 200 largest U.S. cities and their surrounding suburban metropolitan areas have the safest drivers.<span styleName="hide"> Sharing this data every year highlights the importance of educating people about safe driving to reduce car collisions and potentially save lives.</span>
        </p>
        <div>
          <div styleName="comment-button icon-document">
            <a target="_blank" href="assets/abd_report_2016.pdf" title="Download a PDF of the 2017 Allstate America's Best Drivers Report. Opens in new window.">Download the full report</a>
            <span>›</span>
          </div>
          <div styleName="comment-button icon-car">
            <a target="_blank" href="assets/abd_infograph_2016.jpg" title="See the infographic for the 2017 Allstate America's Best Drivers Report. Opens in new window.">Download the infographic</a>
            <span>›</span>
          </div>
        </div>
        <div styleName="ruler"></div>
        <h2>The Safest Drivers <br styleName="mobile" />From Coast To Coast.</h2>
        <p styleName="safest">From always buckling up to never texting behind the wheel, there are many ways people across the nation practice safe driving habits. With its annual report, Allstate hopes to encourage Americans to be safer, smarter drivers.</p>
        <div styleName="bestdriver-wrap">
          <div styleName="bestdriver-left">
            <div id="kaltura_player_1405460565" itemProp="video" itemScope itemType="//schema.org/VideoObject">
              <span itemProp="name" content="Allstate Electric"></span>
              <span itemProp="description" content=""></span>
              <span itemProp="duration" content="152"></span>
              <span itemProp="thumbnail" content="//cdnbakmi.kaltura.com/p/1437641/sp/143764100/thumbnail/entry_id/1_t5joki98/version/100001/acv/201"></span>
              <span itemProp="width" content="560"></span>
              <span itemProp="height" content="315"></span>
            </div>
          </div>

          <div styleName="bestdriver-right">
            <div styleName="stat-top">
              <img src={factCollision} alt="The average driver will experience a collision every 10 years" title="Car crash statistic" />
              <div className="carCrashImage"></div>
              <a className="twitter-button" href="https://twitter.com/share?text=The+average+driver+will+experience+a+collision+every+10+years.+%23BestDriversReport&amp;url=http%3a%2f%2fallstate.com" target="_blank" onClick={trackCustom_tl('Twitter-Share')}>
                <div className="twitterContainer"></div></a>
            </div>
            <div styleName="stat-bottom">
              <img src={fact26} alt="94% of collisions are caused by preventable human factors. #BestDriversReport" title="Car crash speed statistic" />
              <div className="percentage"></div>
              <a className="twitter-button" href="https://twitter.com/share?text=94%25%20of%20collisions%20are%20caused%20by%20preventable%20human%20factors.%20%23BestDriversReport&amp;url=http%3a%2f%2fallstate.com" target="_blank" onClick={trackCustom_tl('Twitter-Share')}><div className="twitterContainer"></div></a>
            </div>
          </div>
        </div>
        <h2>Improve Your Safe <br styleName="mobile" />Driving Skills.</h2>
        <p styleName="regular">Safe driving is smart driving. Improving your safe driving skills can not only help protect you and your family on the road, but it can also help you <a target="_blank" href="http://www.allstate.com/auto-insurance/auto-insurance-discounts.aspx?intcid=ILC-ABD-140805:allstateautoinsurance" styleName="orange">save on Allstate auto insurance</a>. Explore these resources for safe driving pointers:</p>

        <hr styleName="desktop" />
        <div styleName="legal">
          The Allstate America&apos;s Best Drivers Report<sup>&reg;</sup> tabulates property damage frequency of Allstate insured drivers from 2014-2015.The report analyzes the 200 largest cities from the U.S. Census Bureau&apos;s Annual Estimates of the Population for Incorporated Places over 50,000, measured for 2015 as of July 1, 2016. In prior years, neighboring cities that shared zip codes also shared rankings. This only impacted a minimal number of cities; however, since 2014, the report used geolocation to increase accuracy and there are no longer shared rankings. U.S. Census Bureau data was used to obtain the population density factor. For the precipitation factor, National Oceanic and Atmospheric Administration (NOAA) data was utilized. Allstate Drivewise<sup>&reg;</sup> data is based on Allstate customers voluntarily enrolled in the telematics program from 2011-2016. A number of cities from the full 200 Best Drivers rankings are excluded in the Drivewise data due to the limited measurable data available, or because Drivewise was not available (California, North Carolina, South Carolina and Texas). The Allstate Best Drivers Report is produced solely to boost the country&apos;s discussion about safe driving and to increase awareness of the importance of being safe and attentive behind the wheel. The report is not used to determine auto insurance rates.<br/><br/>Allstate found a correlation between hard braking and collision frequency. Cities with higher collision frequency also recorded more hard braking events. Nationally, on average, a driver will experience 19 hard braking events for every 1,000 miles driven.
        </div>
      </div>
    )
  }
}

export default Comments
