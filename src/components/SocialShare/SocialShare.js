// import './style.scss'

import './style.scss'

import {object} from 'prop-types'
import React from 'react'
import _ from 'lodash/fp'
import facebookTwitterLinkedInImage from './ABD_FB_TW_LI.png'
import pinterestImage from './ABD_Pin.png'

const SocialShare = class SocialShare extends React.Component {
  static propTypes = {
    location: object
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

  render () {
    let typeStyle
    if (this.props.location && !_.isEmpty(this.props.location)) {
      console.log('loc', this.props.location)
      typeStyle = 'city-share'
    } else {
      typeStyle = 'page-share'
    }

    const shareUrl = 'https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx'
    const title = `Allstate America's Best Driver Report`
    const pageShareCopy = encodeURIComponent(`Is your city home to the best drivers in the US? The 2017 Allstate America's Best Drivers Report® has the answer.`)

    return (
      <div styleName={`container ${typeStyle}`}>
        <button type="button" aria-label="Social Share" styleName={`social-share-button ${this.state.showPopover ? 'close' : 'share'}`} onClick={this.togglePopover}>
          {this.state.showPopover &&
            <div>
              Close <span styleName="icon">X</span>
            </div>
          }
          {!this.state.showPopover &&
            <div>Share</div>
          }
        </button>
        {this.state.showPopover &&
          <div styleName={`popover-container`}>
            <span>Share </span>

            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} styleName="share-circle share-fb" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>

            <a href={`https://twitter.com/share?text=${pageShareCopy}&amp;url=${shareUrl}`} styleName="share-circle share-twitter" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>

            <a href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${shareUrl}&amp;title=${title}&amp;summary=${pageShareCopy}`} styleName="share-circle share-linkedin" rel="noopener noreferrer" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a>

            <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx&amp;title=${title}&amp;summary=Is%20your%20city%20home%20to%20the%20best%20drivers%20in%20the%20U.S.%3F%20Allstate%E2%80%99s%20annual%20America%E2%80%99s%20%23BestDriversReport%20has%20the%20answer." styleName="share-circle share-pinterest" rel="noopener noreferrer" target="_blank"><i className="fa fa-pinterest" aria-hidden="true"></i></a>

            <a href="mailto:your@email.com?subject=Allstate America's Best Drivers Report&amp;body=Is%20your%20city%20home%20to%20the%20best%20drivers%20in%20the%20U.S.%3F%20Allstate%E2%80%99s%20annual%20America%E2%80%99s%20%23BestDriversReport%20has%20the%20answer. https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx" styleName="share-circle share-email" rel="noopener noreferrer" target="_blank"><i className="fa fa-envelope" aria-hidden="true"></i></a>
          </div>
        }
      </div>
    )
  }
}

export default SocialShare
// Constants
// var pageUrl = 'http://www.allstate.com/';
// var shareImage = '../img/home/share-thumbnail.jpg';
// var cityShareCopy = '{city} is the {rank} safest driving city in 2016. See where your city ranks on America’s #BestDriversReport.';
// var mapShareCopy = 'Is your city home to the best drivers in the U.S.? Allstate’s annual America’s #BestDriversReport has the answer.';

// function setCityShare(city, state, rank) {
//     var cityState = city+', '+state;
//     if(rank == '1<sup>st</sup>') {
//       cityShareCopy = '{city} is THE safest driving city in 2016! See where your city ranks on America’s #BestDriversReport.';
//     } else if(cityState == 'Thornton, CO'){
//       cityShareCopy = 'Well done! It’s {city}’s first time on America’s #BestDriversReport. See where your city ranks:';
//     } else if(cityState == 'Anchorage, AK'){
//       cityShareCopy = '{city} is the most improved city on America’s #BestDriversReport. See where your city ranks:';
//     } else {
//       cityShareCopy = '{city} is the {rank} safest driving city in 2016. See where your city ranks on America’s #BestDriversReport.';
//     }
//     var copy = cityShareCopy.replace('{city}', cityState);
//     copy = copy.replace("{rank}", rank);
//     copy = copy.replace(/<(?:.|\n)*?>/gm, '');
//     return copy;
// }

// function setTwitterShare(city, state, rank) {
//     var cityState = city+', '+state;
//     if(rank == '1<sup>st</sup>') {
//       cityShareCopy = '{city} is THE safest driving city in 2016! See where your city ranks on America’s #BestDriversReport.';
//     } else if(cityState == 'Thornton, CO'){
//       cityShareCopy = 'Well done! It’s {city}’s first time on America’s #BestDriversReport. See where your city ranks:';
//     } else if(cityState == 'Anchorage, AK'){
//       cityShareCopy = '{city} is the most improved city on America’s #BestDriversReport. See where your city ranks:';
//     } else {
//       cityShareCopy = '{city} is the {rank} safest driving city. See where your city ranks on America\'s #BestDriversReport.';
//     }
//     var copy = cityShareCopy.replace('{city}', cityState);
//     copy = copy.replace("{rank}", rank);
//     copy = copy.replace(/<(?:.|\n)*?>/gm, '');
//     return copy;
// }

// function setRSPShare(city, state, rank, type, twitter) {
//     var cityState = city+', '+state;
//     if(type == 'rs' && twitter) {
//       cityShareCopy = '{city} is the {rank} safest driving city in rain and snow. See the 2016 America\'s #BestDriversReport.';
//     } else if(type == 'pop' && twitter) {
//       cityShareCopy = '{city} is the {rank} safest driving city by population density. See the America\'s #BestDriversReport.';
//     } else if(type == 'rs') {
//       cityShareCopy = '{city} is the {rank} safest driving city in rain and snow. See this year\'s America\'s #BestDriversReport.';
//     } else if(type == 'pop') {
//       cityShareCopy = '{city} is the {rank} safest driving city by population density. See where your city ranks on America\'s #BestDriversReport.';
//     }
//     var copy = cityShareCopy.replace('{city}', cityState);
//     copy = copy.replace("{rank}", rank);
//     copy = copy.replace(/<(?:.|\n)*?>/gm, '');
//     return copy;
// }

// // Overall share
// var shareCopy = encodeURIComponent('Is your city home to the best drivers in the U.S.? Allstate’s annual America’s #BestDriversReport has the answer.');
// var baseURL = 'https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx';
// var fbShare = 'https://www.facebook.com/sharer/sharer.php?u=https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx';
// var twShare = 'https://twitter.com/share?text='+shareCopy;
// var inShare = 'https://www.linkedin.com/shareArticle?mini=true&url='+baseURL+'&title=Allstate America\'s Best Drivers Report&summary='+shareCopy;
// var mailShare = 'mailto:your@email.com?subject=Allstate America\'s Best Drivers Report&body='+shareCopy+' '+baseURL;
// var baseShare = '<span class="share-text">Share</span><img src="img/icons/icon-share.png" alt="Share this website" /></a>';
// var shareCircles = '<a href="'+fbShare+'" class="share-circle share-fb"><i class="fa fa-facebook" aria-hidden="true"></i></a><a href="'+twShare+'" class="share-circle share-twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a><a href="'+inShare+'" class="share-circle share-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a><a href="'+mailShare+'" class="share-circle share-email"><i class="fa fa-envelope" aria-hidden="true"></i></a>';
// $('#pageShare').html('<a href="#" data-share="'+shareCopy+'">'+baseShare);
// $('#pageShare a').on('click', function(e){
//   e.preventDefault();
//   if($('.popover').length){
//     $('.popover').remove();
//     $(this).html(baseShare);
//   } else {
//     $('<div class="popover" />').html('Share '+shareCircles).appendTo('#pageShare');
//     $(this).html('Close &nbsp; X');
//   }
//   $('a.share-circle').attr('target','_blank');
// });
