// Constants
var pageUrl = 'http://www.allstate.com/';
var shareImage = '../img/home/share-thumbnail.jpg';
var cityShareCopy = '{city} is the {rank} safest driving city in 2016. See where your city ranks on America’s #BestDriversReport.';
var mapShareCopy = 'Is your city home to the best drivers in the U.S.? Allstate’s annual America’s #BestDriversReport has the answer.';

// Define an image media item:
// var image = {
//     type: 'image',
//     src: shareImage,
//     href: pageUrl
// }

// Define a UserAction onject
// var ua = new gigya.socialize.UserAction();
// ua.setLinkBack(pageUrl);
// ua.setTitle(mapShareCopy);
// ua.setDescription(' ');
// ua.addActionLink("Link", pageUrl);
// ua.addMediaItem(image);

// Define Share Bar plugin's Parameters (Page Level)
// var shareBarParams ={
//     userAction:ua,
//     showCounts:'right',
//     shareButtons:
//     [
//         { // General Share Button
//             provider:'share',
//             tooltip:'Share Button',
//             userMessage: mapShareCopy
//         }
//     ],
//     containerID: 'pageShare', // location of the Share Bar plugin
//     onSendDone: onSendDone // SiteCatalyst Trigger
// }

// Load Share Bar plugin
// gigya.socialize.showShareBarUI(shareBarParams);

// Define a UserAction onject
// var uaCity = new gigya.socialize.UserAction();
// uaCity.setLinkBack(pageUrl);
// uaCity.setTitle(cityShareCopy);
// uaCity.setDescription(' ');
// uaCity.addActionLink("Link", pageUrl);
// uaCity.addMediaItem(image);

// Define Share Bar plugin's Parameters (City Level)
// var cityShareBarParams = {
//     userAction: uaCity,
//     shareButtons:
//     [
//         { // General Share Button
//             provider: 'share',
//             tooltip: 'Share Button',
//             userMessage: cityShareCopy,
//         }
//     ],
//     containerID: 'cityShare', // location of the Share Bar plugin
//     onSendDone: onSendDone // SiteCatalyst Trigger
// }

// Load Share Bar plugin
// gigya.socialize.showShareBarUI(cityShareBarParams);

function setCityShare(city, state, rank) {
    var cityState = city+', '+state;
    if(rank == '1<sup>st</sup>') {
      cityShareCopy = '{city} is THE safest driving city in 2016! See where your city ranks on America’s #BestDriversReport.';
    } else if(cityState == 'Thornton, CO'){
      cityShareCopy = 'Well done! It’s {city}’s first time on America’s #BestDriversReport. See where your city ranks:';
    } else if(cityState == 'Anchorage, AK'){
      cityShareCopy = '{city} is the most improved city on America’s #BestDriversReport. See where your city ranks:';
    } else {
      cityShareCopy = '{city} is the {rank} safest driving city in 2016. See where your city ranks on America’s #BestDriversReport.';
    }
    var copy = cityShareCopy.replace('{city}', cityState);
    copy = copy.replace("{rank}", rank);
    copy = copy.replace(/<(?:.|\n)*?>/gm, '');
    return copy;
}

function setTwitterShare(city, state, rank) {
    var cityState = city+', '+state;
    if(rank == '1<sup>st</sup>') {
      cityShareCopy = '{city} is THE safest driving city in 2016! See where your city ranks on America’s #BestDriversReport.';
    } else if(cityState == 'Thornton, CO'){
      cityShareCopy = 'Well done! It’s {city}’s first time on America’s #BestDriversReport. See where your city ranks:';
    } else if(cityState == 'Anchorage, AK'){
      cityShareCopy = '{city} is the most improved city on America’s #BestDriversReport. See where your city ranks:';
    } else {
      cityShareCopy = '{city} is the {rank} safest driving city. See where your city ranks on America\'s #BestDriversReport.';
    }
    var copy = cityShareCopy.replace('{city}', cityState);
    copy = copy.replace("{rank}", rank);
    copy = copy.replace(/<(?:.|\n)*?>/gm, '');
    return copy;
}

function setRSPShare(city, state, rank, type, twitter) {
    var cityState = city+', '+state;
    if(type == 'rs' && twitter) {
      cityShareCopy = '{city} is the {rank} safest driving city in rain and snow. See the 2016 America\'s #BestDriversReport.';
    } else if(type == 'pop' && twitter) {
      cityShareCopy = '{city} is the {rank} safest driving city by population density. See the America\'s #BestDriversReport.';
    } else if(type == 'rs') {
      cityShareCopy = '{city} is the {rank} safest driving city in rain and snow. See this year\'s America\'s #BestDriversReport.';
    } else if(type == 'pop') {
      cityShareCopy = '{city} is the {rank} safest driving city by population density. See where your city ranks on America\'s #BestDriversReport.';
    }
    var copy = cityShareCopy.replace('{city}', cityState);
    copy = copy.replace("{rank}", rank);
    copy = copy.replace(/<(?:.|\n)*?>/gm, '');
    return copy;
}

// function onSendDone(event) {
//     if(event.providers) {
//       var providers = event.providers.split(",");
//       for(i = 0; i < providers.length; i++) {
//            trackCustom_tl(providers[i]);
//       }
//     }
// }

// Overall share
var shareCopy = encodeURIComponent('Is your city home to the best drivers in the U.S.? Allstate’s annual America’s #BestDriversReport has the answer.');
var baseURL = 'https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx';
var fbShare = 'https://www.facebook.com/sharer/sharer.php?u=https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx';
var twShare = 'https://twitter.com/share?text='+shareCopy;
var inShare = 'https://www.linkedin.com/shareArticle?mini=true&url='+baseURL+'&title=Allstate America\'s Best Drivers Report&summary='+shareCopy;
var mailShare = 'mailto:your@email.com?subject=Allstate America\'s Best Drivers Report&body='+shareCopy+' '+baseURL;
var baseShare = '<span class="share-text">Share</span><img src="img/icons/icon-share.png" alt="Share this website" /></a>';
var shareCircles = '<a href="'+fbShare+'" class="share-circle share-fb"><i class="fa fa-facebook" aria-hidden="true"></i></a><a href="'+twShare+'" class="share-circle share-twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a><a href="'+inShare+'" class="share-circle share-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a><a href="'+mailShare+'" class="share-circle share-email"><i class="fa fa-envelope" aria-hidden="true"></i></a>';
$('#pageShare').html('<a href="#" data-share="'+shareCopy+'">'+baseShare);
$('#pageShare a').on('click', function(e){
  e.preventDefault();
  if($('.popover').length){
    $('.popover').remove();
    $(this).html(baseShare);
  } else {
    $('<div class="popover" />').html('Share '+shareCircles).appendTo('#pageShare');
    $(this).html('Close &nbsp; X');
  }
  $('a.share-circle').attr('target','_blank');
});
