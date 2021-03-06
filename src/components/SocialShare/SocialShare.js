// import './style.scss'

import './style.scss'

import {object, string, bool} from 'prop-types'
import React from 'react'
import _ from 'lodash/fp'
import Helmet from 'react-helmet'
import {PINTEREST_SHARE_IMAGE_URL, SHARE_URL, DEFAULT_PAGE_SHARE_COPY} from 'constants/socialMedia'
import {TOP_CITY, RAIN_SNOW, DENSITY} from 'constants/maps'

function ordinal (n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  const suffix = (s[(v - 20) % 10] || s[v] || s[0])
  return n + suffix
}
const SocialShare = class SocialShare extends React.Component {
  static propTypes = {
    location: object,
    selectedMap: string,
    modalIsOpen: bool
  }
  constructor () {
    super()
    this.state = {
      showPopover: false
    }
  }
  togglePopover = () => {
    let showPopover = !this.state.showPopover
    this.setState({ showPopover })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.modalIsOpen && this.state.showPopover) {
      this.setState({ showPopover: false })
    }
  }
  handleFB = () => {
    FB.ui({
      method: 'share',
      href: SHARE_URL
    }, function (response) { })
  }
  handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      document.getElementById('socialShareButtonClose').focus()
    }
  }
  render () {
    let typeStyle
    let pageShareCopy
    const {location, selectedMap} = this.props
    const {showPopover} = this.state
    const title = `Allstate America's Best Driver Report®`
    let twitterUrl
    let linkedInUrl
    let pinterestUrl

    if (location && !_.isEmpty(location)) {
      typeStyle = 'city-share'
      let rankings = _.getOr({}, 'rankings.currentYearRankings', location)

      if (selectedMap && selectedMap === TOP_CITY && rankings['Top Cities'] === 1) {
        pageShareCopy = `${location.cityState} is the safest driving city in 2017 on Allstate America's Best Drivers Report®.`
      } else if (selectedMap && selectedMap === RAIN_SNOW) {
        pageShareCopy = `${location.cityState} is the ${ordinal(rankings['Rain & Snow'])} safest driving city in rain and snow on Allstate America's Best Drivers Report®.`
      } else if (selectedMap && selectedMap === DENSITY) {
        pageShareCopy = `${location.cityState} is the ${ordinal(rankings['Population Density'])} safest driving city by population density on Allstate America's Best Drivers Report®.`
      } else if (location.mostImproved) {
        pageShareCopy = `${location.cityState} is the most improved city on Allstate America's Best Drivers Report®.`
      } else if (location.newLocation) {
        pageShareCopy = `Well done! It's ${location.cityState}'s first time on Allstate America's Best Drivers Report®.`
      } else {
        pageShareCopy = `${location.cityState} drivers rank ${ordinal(rankings['Top Cities'])} on the Allstate America's Best Drivers Report®.`
      }
    } else {
      typeStyle = 'page-share'
      pageShareCopy = DEFAULT_PAGE_SHARE_COPY
    }

    twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(pageShareCopy)}&amp;url=${SHARE_URL}`
    linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&amp;url=${SHARE_URL}&amp;title=${encodeURIComponent(title)}&amp;summary=${encodeURIComponent(pageShareCopy)}&amp;source=${SHARE_URL}`
    pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${SHARE_URL}&media=${PINTEREST_SHARE_IMAGE_URL}&description=${encodeURIComponent(pageShareCopy)}`

    return (
      <div styleName={`container ${typeStyle}`}>
        <Helmet>
          <meta property="og:description" content={pageShareCopy} />
        </Helmet>
        <div id="fb-root"></div>

        <button type="button" id={`${showPopover ? 'socialShareButtonClose' : 'socialShareButtonShare'}`} aria-label={`${showPopover ? 'close' : 'share'}`} styleName={`social-share-button ${showPopover ? 'close' : 'share'}`} onClick={this.togglePopover}>
          <div>
            <If condition={ showPopover }>
              Close <span styleName="icon">X</span>
            </If>
            <If condition={ !showPopover }>
              Share
            </If>
          </div>
        </button>
        <If condition={ showPopover }>
          <div styleName={`popover-container`}>
            <span>Share </span>

            <a href="javascript:void(0)" aria-label="Facebook" onClick={this.handleFB} styleName="share-circle share-fb" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a>

            <a href={twitterUrl} aria-label="Twitter" styleName="share-circle share-twitter" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a>

            <a href={linkedInUrl} aria-label="Linked In" styleName="share-circle share-linkedin" rel="noopener noreferrer" target="_blank"><i className="fa fa-linkedin"></i></a>

            <a data-pin-do="buttonPin" aria-label="Pinterest" data-pin-custom="true" rel="noopener noreferrer" target="_blank" styleName="share-circle share-pinterest" href={pinterestUrl} onKeyDown={this.handleKeyDown}><i className="fa fa-pinterest"></i></a>

            {/*
            <a href={`mailto:your@email.com?subject=${title}&amp;body=${encodeURIComponent(pageShareCopy)}%0A${SHARE_URL}`} styleName="share-circle share-email"><i className="fa fa-envelope" aria-hidden="true"></i></a> */}
          </div>
        </If>
      </div>
    )
  }
}

export default SocialShare
