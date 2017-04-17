<%
  Dim cityName, cityRank, dataYear, currentTab
  cityName = Request.QueryString("city")
  cityRank = Request.QueryString("rank")
  dataYear = Request.QueryString("year")
  currentTab = Request.QueryString("tab")
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>

    <title>Allstate America's Best Drivers Report</title>

    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta http-equiv=”x-ua-compatible” content=”IE=edge” />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="keywords" content="best drivers, America's best drivers, best drivers in America, best U.S. drivers, 2016 America's best drivers report" />
    <meta name="description" content="Is your city home to the best drivers in America? Explore Allstate's annual best drivers report and interactive map." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>

    <!-- Open Graph Tags -->
    <meta property="fb:app_id" content="51244333578" />
    <meta property="og:title" content="America's Best Driver Report" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="http://allstate-abd.uat.thethinktank.com/img/share.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="315" />
    <% if ( string.IsNullOrEmpty(cityName) or string.IsNullOrEmpty(cityRank) or string.IsNullOrEmpty(dataYear) ) %>
    <meta property="og:description" content="Is your city home to the best drivers in the U.S.? Allstate's annual America's #BestDriversReport has the answer." />
    <meta property="og:url" content="http://allstate-abd.uat.thethinktank.com" />
    <link rel="canonical" href="http://allstate-abd.uat.thethinktank.com">
      <% else
         if(cityName.Equals("Anchorage, AK")) %>
    <meta property="og:description" content="<%=cityName%> is the most improved city on America's #BestDriversReport. See where your city ranks." />
      <% else if(cityName.Equals("Thornton, CO")) %>
    <meta property="og:description" content="Well done! It's <%=cityName%>'s' first time on America's #BestDriversReport. See where your city ranks." />
      <% else if(string.IsNullOrEmpty(currentTab))%>
    <meta property="og:description" content="<%=cityName%> is the <%=cityRank%> safest driving city in <%=dataYear%>. See where your city ranks on America's #BestDriversReport" />
      <% else if(currentTab.Equals("rainandsnow")) %>
    <meta property="og:description" content="<%=cityName%> is the <%=cityRank%> safest driving city in rain and snow. See this year's America's #BestDriversReport." />
      <% else if(currentTab.Equals("density")) %>
    <meta property="og:description" content="<%=cityName%> is the <%=cityRank%> safest driving city by population density. See where your city ranks on America's #BestDriversReport." />
      <% end if %>
    <meta property="og:url" content="http://allstate-abd.uat.thethinktank.com/?city=<%=cityName%>&rank=<%=cityRank%>&year=<%=dataYear%>&tab=<%=currentTab%>" />
    <link rel="canonical" href="http://allstate-abd.uat.thethinktank.com/?city=<%=cityName%>&rank=<%=cityRank%>&year=<%=dataYear%>&tab=<%=currentTab%>">
    <% end if %>

    <!--[if gt IE 8]>
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:400,600" />
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="css/global.css" />
    <link rel="stylesheet" type="text/css" href="css/best_driver.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.selectbox.css" />
    <link rel="stylesheet" type="text/css" href="css/jqmodal.css" />
    <link rel="stylesheet" type="text/css" href="css/carousel.css" />

    <!-- Load Gigya's JS library -->
    <script type="text/javascript" lang="javascript" src="http://cdn.gigya.com/JS/socialize.js?apikey=3_Uk95Mmi5mBePVs-6Y5rUJH3o6duMRC8WmoWuEB9aw-Vcg89IK3ojb3Y9Dp4T8hLT"></script>
    <script type="text/javascript" src="http://cdn.gigya.com/js/gigyaGAIntegration.js" ></script>

    <!-- JVECTOR -->
    <link rel="stylesheet" href="css/jquery-jvectormap-1.2.2.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="css/mapping.css" type="text/css" media="screen"/>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,800,700,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" media="all" href="css/jquery-ui-1.8.22.custom.css">
    <!--*****END JVECTOR -->

  </head>
  <body>

    <script type="text/javascript">
       /* control elements based upon if JavaScript is enabled by adding a class high up in the page as close to the body tag as possible */
       document.body.className+=' js';
    </script>
    <!--[if IE 9]>
    <div class="ie9">
    <![endif]-->
    <!--[if lte IE 8]>
    <div class="ie8">
    <![endif]-->
    <!--[if lte IE 7]>
    <div class="ie7">
    <![endif]-->

    <!-- Begin Page Center Content Section -->
    <div id="content" class="container_12">

      <div class="abd-crumbs">
        <a href="https://www.allstate.com/">Allstate</a>
        >
        <a href="https://www.allstate.com/tools-and-resources.aspx">Tools &amp; Resources</a>
        >
        <a href="https://www.allstate.com/tools-and-resources/car-insurance.aspx">Car Insurance</a>
        >
        America's Best Drivers
      </div>

      <div class="hero-bestdriver desktop">
        <img title="The 2016 Allstate America's Best Drivers Report" alt="Explore the America's Best Drivers Report to see the top safe driving cities" src="img/home/americas-best-drivers-logo.png" />
      </div>

      <div class="hero-bestdriver mobile">
        <img title="The 2016 Allstate America's Best Drivers Report" alt="Explore the America's Best Drivers Report to see the top safe driving cities" src="img/mobile/mobile-logo.png" />
      </div>

      <div class="bestdriver-app">

        <div class="mappingContainer">

          <div class="tabContentContainer">

            <!-- Top Cities -->
            <div class="tabContent" id="advantages">

              <div class="tabContentMap">

                <ul id="tabs">
                  <li class="selected tab" id="topCity"
                      data-byline="Explore which cities are least likely to experience collisions."
                      data-type="2016 Top Cities"
                      data-color="#0096d6"
                      data-selcolor="#073F6E"
                      data-strokecolor="#43c7ff">
                    <div class="title">Top <br class="mobile" />Cities</div>
                    <div class="bottomColor"></div>
                  </li>
                  <li class="tab" id="density"
                      data-byline="See how population density impacts driving in your city."
                      data-type="2016 Population Density"
                      data-color="#e6527a"
                      data-selcolor="#a6284a"
                      data-strokecolor="#ff9db8">
                    <div class="title">Population <br class="mobile" />Density<span class="tab_note gt2014">Map view not available</span><span class="tab_note lt2014">No data available</span></div>
                    <div class="bottomColor"></div>
                  </li>
                  <li class="tab" id="rainSnow"
                      data-byline="See how precipitation (or lack thereof) impacts your city's ranking."
                      data-type="2016 Rain & Snow"
                      data-color="#6d5dc9"
                      data-selcolor="#342394"
                      data-strokecolor="#a292ff">
                    <div class="title">Rain &amp; <br class="mobile" />Snow<span class="tab_note gt2014">Map view not available</span><span class="tab_note lt2014">No data available</span></div>
                    <div class="bottomColor"></div>
                  </li>
                </ul>

                <div class="map" style=""></div>
                <div class="ui-blocker"></div>

                <div class="modal" data-bind="css: { newLocation: currentActiveLocation()['New'] && year() == '2016', mostImproved: currentActiveLocation()['Improved'] && year() == '2016'}">
                  <div class="modalContainer">

                    <div id="close" class="close"></div>

                    <div class="cityContainer">
                      <h2 data-bind="text: currentActiveLocation().City +', '+currentActiveLocation().State" class="cityName"></h2>
                      <!-- ko if: year() == '2016' -->
                        <h2 class="cityRank">is the <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' '+type()])"></span> safest driving city <span class="densityLine">by Population Density
</span><span class="rainSnowLine">in Rain &amp; Snow</span></h2>
                      <!-- /ko -->
                      <!-- ko if: year() != '2016' -->
                        <h2 class="cityRank">was the <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' '+type()])"></span> safest driving city <span class="densityLine">by Population Density
</span><span class="rainSnowLine">in Rain &amp; Snow</span> in <span class="year" data-bind="text: year"></span></h2>
                      <!-- /ko -->
                    </div><!-- //.cityContainer -->

                    <!-- ko if: year() == '2016'-->
                    <div class="badgeWrapper">
                    <!-- ko switch -->
                      <!-- ko case: currentActiveLocation()[year()+' Top Cities'] == 1 -->
                      <div class="badge">
                        <img src="img/icons/icon-1.png" alt="Top City" class="badge-icon" />
                        <p><strong>This year's best!</strong>It was ranked <span data-bind="html: formattedNumber(currentActiveLocation()['2015 Top Cities'])" style="font-weight:600"></span> in 2015</p>
                      </div>
                      <!-- /ko -->
                      <!-- ko case: currentActiveLocation()['New'] -->
                      <div class="badge newAddition">
                        <img src="img/icons/icon-new.png" alt="New!" class="badge-icon" />
                        <p><strong>New addition!</strong>It's <span data-bind="html: currentActiveLocation().City"></span>'s first time on the list</p>
                      </div>
                      <!-- /ko -->
                      <!-- ko case: currentActiveLocation()['Improved'] -->
                      <div class="badge mostImproved">
                        <img src="img/icons/icon-improved.png" alt="Most Improved!" class="badge-icon" />
                        <p><strong>Most improved!</strong> It was ranked <span data-bind="html: formattedNumber(currentActiveLocation()['2015 Top Cities'])" style="font-weight:600"></span> in 2015</p>
                      </div>
                      <!-- /ko -->
                      <!-- ko case: currentActiveLocation()[year()+' Change'] < 0 -->
                      <div class="badge">
                        <img src="img/icons/icon-down.png" alt="Ranked up" class="badge-icon" />
                        <p>It was ranked <span data-bind="html: formattedNumber(currentActiveLocation()['2015 Top Cities'])" style="font-weight:600"></span> in 2015</p>
                      </div>
                      <!-- /ko -->
                      <!-- ko case: currentActiveLocation()[year()+' Change'] > 0 -->
                      <div class="badge">
                        <img src="img/icons/icon-up.png" alt="Downranked" class="badge-icon" />
                        <p>It was ranked <span data-bind="html: formattedNumber(currentActiveLocation()['2015 Top Cities'])" style="font-weight:600"></span> in 2015</p>
                      </div>
                      <!-- /ko -->
                      <!-- ko case: currentActiveLocation()[year()+' Top Cities'] == currentActiveLocation()['2015 Top Cities'] -->
                      <div class="badge">
                        <img src="img/icons/icon-equal.png" alt="No Change" class="badge-icon" />
                        <p>It was ranked <span data-bind="html: formattedNumber(currentActiveLocation()['2015 Top Cities'])" style="font-weight:600"></span> in 2015</p>
                      </div>
                      <!-- /ko -->
                    <!-- /ko -->
                  </div>
                  <!-- /ko -->

                    <!-- ko if: year() == '2016'-->
                    <div class="rankings">
                      <div class="modalHeader"><span class="year" data-bind="text: year"></span> rankings:</div>

                      <!-- ko if: currentActiveLocation()[year()+' Top Cities'] -->
                      <div class="topCities section">
                        <h2>Top Cities:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Top Cities'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Population Density'] -->
                      <div class="density section">
                        <h2>Population Density:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Population Density'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Rain & Snow'] -->
                      <div class="rainSnow section">
                        <h2>Rain &amp; Snow:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Rain & Snow'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                    </div><!-- //.rankings -->
                    <!-- /ko -->

                    <!-- ko if: year() == '2015'-->
                    <div class="rankings">
                      <div class="modalHeader"><span class="year" data-bind="text: year"></span> rankings:</div>

                      <!-- ko if: currentActiveLocation()[year()+' Top Cities'] -->
                      <div class="topCities section">
                        <h2>Top Cities:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Top Cities'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Population Density'] -->
                      <div class="density section">
                        <h2>Population Density:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Population Density'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Rain & Snow'] -->
                      <div class="rainSnow section">
                        <h2>Rain &amp; Snow:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Rain & Snow'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                    </div><!-- //.rankings -->
                    <!-- /ko -->

                    <!-- ko if: year() == '2014'-->
                    <div class="rankings">
                      <div class="modalHeader"><span class="year" data-bind="text: year"></span> rankings:</div>

                      <!-- ko if: currentActiveLocation()[year()+' Top Cities'] -->
                      <div class="topCities section">
                        <h2>Top Cities:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Top Cities'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Population Density'] -->
                      <div class="density section">
                        <h2>Population Density:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Population Density'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Rain & Snow'] -->
                      <div class="rainSnow section">
                        <h2>Rain &amp; Snow:</h2>
                        <h2 class="numRank">
                          <span data-bind="html: formattedNumber(currentActiveLocation()[year()+' Rain & Snow'])"></span><span class="ordinal"></span>
                        </h2>
                      </div>
                      <!-- /ko -->

                    </div><!-- //.rankings -->
                    <!-- /ko -->

                      <!-- ko if: currentActiveLocation()[year()+' Braking Events'] -->
                      <div class="rankings noTop">
                        <div class="brakingEvent section">
                          <h2>
                            Drivewise<sup>&reg;</sup> Braking Events <br class="mobile" />per 1,000 miles
                            <a href="#" class="drivewise-information">
                              <div class="drivewise-information-popup">
                                <p>Allstate found a correlation between hard braking and collision frequency. Cities with higher collision frequency also recorded more hard braking events. Nationally, on average, a driver will experience 19 hard braking events for every 1,000 miles driven.</p>
                                <img src="img/icons/arrow-left-blue.png" alt="Tooltip" />
                              </div>
                            </a>
                            <a href="#" class="drivewise-information-popup-close">Close Popup</a>
                          </h2>
                          <h2 class="numRank">
                            <span data-bind="html: currentActiveLocation()[year()+' Braking Events']" ></span><span class="ordinal"></span>
                          </h2>
                        </div>
                      </div>
                      <!-- /ko -->

                    <!-- /ko -->

                    <div class="shareContainer">
                      <div id="cityShare"></div>
                    </div>

                  </div><!--//.modalContainer-->
                </div><!--//.modal-->
              </div><!--//.tabContentMap-->

              <div class="tabContentOther">

                <div class="listingHeader">

                  <div class="headingContainer">
                    <div class="icon" data-bind="css: id"></div>
                    <h4 class="year" data-bind="text: year"></h4>
                    <h3 class="title" data-bind="text: type"> </h3>
                  </div>
                  <p data-bind="text: byline"></p>

                </div><!--//.listingHeader-->

                <div class="toplistings">

                  <div class="clearfix change-year">
                    <div class="blocker"></div>
                    <span class="year-selector">Select year:</span>
                    <nav class="desktop">
                      <select class="year-selector">
                        <option selected="selected" value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                      </select>
                    </nav>
                    <div class="year-selector-mobile mobile">
                      <a href="#" class="previous-year"><span>Previous Year</span></a>
                      <span class="selected-year"></span>
                      <a href="#" class="next-year newest-year"><span>Next Year</span></a>
                    </div>
                  </div>

                  <div class="mobile-wrap">
                    <ul data-bind="foreach: locations, visible: locations().length > 0">
                      <li data-bind="click: $parent.popModal, attr:{idx: location()[$parent.year()+' '+$parent.type()]}" >
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="44px" viewbox="0 0 30 44" enable-background="new 0 0 30 44" xml:space="preserve">
                          <path fill="#0276A7" d="M28.898,16.164c0,7.659-13.867,24.65-13.867,24.65S1.167,23.822,1.167,16.164c0-7.658,6.208-13.866,13.864-13.866C22.689,2.298,28.898,8.505,28.898,16.164z"/>
                          <text text-anchor="middle" alignment-baseline="middle" x="14.4" y="16" style="fill: #fff; font-size: 12px;" data-bind="text:location()[$parent.year()+' '+$parent.type()]"></text>
                          <p data-bind="text: location().City +', '+ location().State"></p>
                        </svg>
                      </li>
                    </ul>
                  </div>

                  <div class="previous-next-items mobile">
                    <a href="#" class="previous-item oldest-item"><span>Previous</span></a> &nbsp;|&nbsp;
                    <a href="#" class="next-item "><span>Next</span></a>
                  </div>

                </div><!--//.toplistings-->

              </div><!--//.tabContentOther-->
            </div><!--//.tabContent-->
          </div><!--//.tabContentContainer-->
        </div><!--//.mappingContainer-->

        <div class="timeLine-SocialContainer clearfix">
          <div class="legendContainer">
            <ul>
              <li><span class="blue">&bull;</span> Top Cities</li>
              <li><span class="yellow">&bull;</span> Most Improved</li>
              <li><span class="green">&bull;</span> New Additions</li>
            </ul>
          </div>
          <div class="socialContainer">
            <div id="pageShare"></div>
          </div>
        </div><!--//.timeLine-SocialContainer-->

      </div><!--//.bestdriver-app-->

      <div class="commentContainer">
        <p><span class="hide">Allstate is committed to helping people across the nation protect their cars and families. </span>The Allstate America's Best Drivers Report<sup class="superscript">&reg;</sup> is an annual ranking that identifies which of the 200 largest U.S. cities have the safest drivers.<span class="hide"> Sharing this data every year highlights the importance of educating people about safe driving.</span></p>
        <div>
          <div class="commentButton iconDocument">
            <a target="_blank" href="assets/abd_report_2016.pdf">Download the full report</a>
            <span>&rsaquo;</span>
          </div>
          <div class="commentButton iconCar">
            <a target="_blank" href="assets/abd_infograph_2016.jpg">Download the infographic</a>
            <span>&rsaquo;</span>
          </div>
        </div>
      </div>

      <div class="ruler"></div>

      <h2>The Safest Drivers <br class="mobile" />From Coast To Coast.</h2>
      <p class="safest">From always buckling up to never texting behind the wheel, there are many ways people across the nation practice safe driving habits. With its annual report, Allstate hopes to encourage Americans to be safer, smarter drivers.</p>

      <div class="bestdriver-wrap">
        <div class="bestdriver-left">
          <div id="kaltura_player_1405460565" itemprop="video" itemscope=itemscope itemtype="//schema.org/VideoObject">
            <span itemprop="name" content="Allstate Electric"></span>
            <span itemprop="description" content=""></span>
            <span itemprop="duration" content="152"></span>
            <span itemprop="thumbnail" content="//cdnbakmi.kaltura.com/p/1437641/sp/143764100/thumbnail/entry_id/1_t5joki98/version/100001/acv/201"></span>
            <span itemprop="width" content="560"></span>
            <span itemprop="height" content="315"></span>
          </div>
        </div><!--//.bestdriver-left-->

        <div class="bestdriver-right">
          <div class="stat-top">
            <img src="img/home/fact-collision10Years-top.png" alt="The average driver will experience a collision every 10 years" title="Car crash statistic"/>
            <div class="carCrashImage"></div>
            <a class="twitter-button" href="https://twitter.com/share?text=The+average+driver+will+experience+a+collision+every+10+years.+%23BestDriversReport&url=http%3a%2f%2fallstate.com" target="_blank" onclick="javascript:trackCustom_tl('Twitter-Share')">
            <div class="twitterContainer"></div></a>
          </div>
          <div class="stat-bottom">
            <img src="img/home/fact-26-bottom.png" alt="94% of collisions are caused by preventable human factors. #BestDriversReport" title="Car crash speed statistic"/>
            <div class="percentage"></div>
            <a class="twitter-button" href="https://twitter.com/share?text=94%25%20of%20collisions%20are%20caused%20by%20preventable%20human%20factors.%20%23BestDriversReport&url=http%3a%2f%2fallstate.com" target="_blank" onclick="javascript:trackCustom_tl('Twitter-Share')"><div class="twitterContainer"></div></a>
          </div>
        </div><!--//.bestdriver-right-->
      </div><!--//.bestdriver-wrap-->

      <hr />

      <h2>Improve Your Safe <br class="mobile" />Driving Skills.</h2>
      <p class="regular">Safe driving is smart driving. Improving your safe driving skills can not only help protect you and your family on the road, but it can also help you save on <a target="_blank" href="http://www.allstate.com/auto-insurance/auto-insurance-discounts.aspx?intcid=ILC-ABD-140805:allstateautoinsurance" class="orange">save on Allstate auto insurance</a>. Explore these resources for safe driving pointers:</p>

      <div class="FreeTextScroller">
        <div class="home-carousel">
          <div class="slides-outer">
            <div class="slides-inner">
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Common causes of car crashes and how to avoid them" alt="Learn how to help protect yourself against common causes of car accidents" src="img/carousel/5AccidentAvoidanceTips.jpg" width="222" height="244" />
                    <h3><a title="Read article on the Allstate Blog" target="_blank" href="http://blog.allstate.com/common-causes-of-car-accidents/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Teaching Your New Teen Driver')">5 Accident Avoidance Tips.</a></h3>
                    <p>Learn about common causes of car accidents and get strategies on how to avoid them.</p>
                    <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/common-causes-of-car-accidents/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Teaching Your New Teen Driver')"><span>Read blog article</span></a></p>

                  </div>
                </div>
              </div>
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Help your teen be a better passenger" alt="Get tips on how to help your teen or yourself become a better car ride passenger" src="img/carousel/HowToBeABetterPassenger.jpg" width="222" height="244"  />
                    <h3><a title="Read article on the Allstate Blog" target="_blank" href="https://blog.allstate.com/distracted-driving-tips-for-teens-be-a-better-passenger/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Driving on Slick Roads')">How To Be A Better Passenger.</a></h3>
                    <p>You may be a safe driver, but what about when you're along for the ride? Get our tips.</p>
                    <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="https://blog.allstate.com/distracted-driving-tips-for-teens-be-a-better-passenger/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Driving on Slick Roads')"><span>Read blog article</span></a></p>

                  </div>
                </div>
              </div>
            </div>
            <div class="slides-inner">
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Distracted Driving Poll Infographic" alt="See statistics about texting while driving and how people feel about it" src="img/carousel/InfographicSafeDrivingPoll.jpg" width="222" height="244"  />
                    <h3><a title="See infographic on the Allstate Blog" target="_blank" href="http://blog.allstate.com/distracted-driving-staying-safe-on-the-road-infographic/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('How To Avoid Drowsy Driving')">Infographic: Safe Driving Poll.</a></h3>
                    <p>Discover what your fellow drivers have to say about texting while driving and other distractions.</p>
                    <p><a title="See infographic on the Allstate Blog"  target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/distracted-driving-staying-safe-on-the-road-infographic/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('How To Avoid Drowsy Driving')"><span>See infographic</span></a></p>

                  </div>
                </div>
              </div>
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Steps to take after a car crash" alt="See our checklist of things you should do after you get in a car crash" src="img/carousel/WhatToDoAfterAnAccident.jpg" width="222" height="244" />
                    <h3><a title="Read article on the Tools and Resources section of this site" target="_blank"  href="https://www.allstate.com/tools-and-resources/car-insurance/in-case-of-a-car-accident.aspx?intcid=ABD|carousel|Accident" onclick="javascript:trackCustom_scLV('What To Do After An Accident')">What To Do After An Accident.</a></h3>
                    <p>Should you call the police? Should you move your car? Learn what to do after a collision.</p>
                    <p><a title="Read article on the Tools and Resources section of this site"  target="_blank" class="btn-cta-sm" href="https://www.allstate.com/tools-and-resources/car-insurance/in-case-of-a-car-accident.aspx?intcid=ABD|carousel|Accident" onclick="javascript:trackCustom_scLV('What To Do After An Accident')"><span>Read article</span></a></p>

                  </div>
                </div>
              </div>
            </div>
            <div class="slides-inner">
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Different seasons call for different maintenance to your vehicle" alt="Get a checklist of things you should do to prepare your car for any season" src="img/carousel/SevereWeatherDrivingPrep.jpg" width="222" height="244"  />
                    <h3><a title="Read article on the Allstate Blog" target="_blank" href="http://blog.allstate.com/preparing-for-four-seasons-of-severe-weather-driving/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Safety Tips For Driving At Night')">Severe Weather Driving Prep.</a></h3>
                    <p>These seasonal car maintenance tips will keep your car in great shape in any climate, all year.</p>
                    <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/preparing-for-four-seasons-of-severe-weather-driving/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Safety Tips For Driving At Night')"><span>Read blog article</span></a></p>

                  </div>
                </div>
              </div>
              <div class="slide-bot" style="width:50%">
                <div class="slide" >
                  <div class="slideContents">

                    <img title="Many factors affect your auto insurance premium" alt="See the factors that influence how much it costs to insure your car" src="img/carousel/WhatAffectsYourPremium.jpg" width="222" height="244" />
                    <h3><a title="Read article on the Tools and Resources section of this site" target="_blank" href="https://www.allstate.com/tools-and-resources/car-insurance/factors-affect-your-auto-insurance.aspx?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Accident Avoidance Tips')">What Affects Your Premium?</a></h3>
                    <p>Many factors—from your age to your driving record—impact the cost to insure your car. See how.</p>
                    <p><a title="Read article on the Tools and Resources section of this site" target="_blank" class="btn-cta-sm" href="https://www.allstate.com/tools-and-resources/car-insurance/factors-affect-your-auto-insurance.aspx?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Accident Avoidance Tips')"><span>Read article</span></a></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slides-nav"></div>
          <a class="slides_prev">Previous</a>
          <a class="slides_next">Next</a>
        </div><!-- // .home-carousel -->


        <!-- MOBILE VERSION -->
        <div class="respFreeTextScroller">
          <div class="respFreeTextContainer">
            <div class="respSlides">
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents"><!--Roadside Services Driver - Carousel-->

                      <img title="Common causes of car crashes and how to avoid them" alt="Learn how to help protect yourself against common causes of car accidents" src="img/carousel/mobile/5AccidentAvoidanceTips.jpg" width="222" height="244" />
                      <h3><a title="Read article on the Allstate Blog" target="_blank" href="http://blog.allstate.com/common-causes-of-car-accidents/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Teaching Your New Teen Driver')">5 Accident Avoidance Tips.</a></h3>
                      <p>Learn about common causes of car accidents and get strategies on how to avoid them.</p>
                      <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/common-causes-of-car-accidents/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Teaching Your New Teen Driver')"><span>Read blog article</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents">

                      <img title="Help your teen be a better passenger" alt="Get tips on how to help your teen or yourself become a better car ride passenger" src="img/carousel/mobile/HowToBeABetterPassenger.jpg" width="222" height="244"  />
                      <h3><a title="Read article on the Allstate Blog" target="_blank" href="https://blog.allstate.com/distracted-driving-tips-for-teens-be-a-better-passenger/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Driving on Slick Roads')">How To Be A Better Passenger.</a></h3>
                      <p>You may be a safe driver, but what about when you're along for the ride? Get our tips.</p>
                      <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="https://blog.allstate.com/distracted-driving-tips-for-teens-be-a-better-passenger/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Driving on Slick Roads')"><span>Read blog article</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents">

                      <img title="Distracted Driving Poll Infographic" alt="See statistics about texting while driving and how people feel about it" src="img/carousel/mobile/InfographicSafeDrivingPoll.jpg" width="222" height="244"  />
                      <h3><a title="See infographic on the Allstate Blog" target="_blank" href="http://blog.allstate.com/distracted-driving-staying-safe-on-the-road-infographic/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('How To Avoid Drowsy Driving')">Infographic: Safe Driving Poll.</a></h3>
                      <p>Discover what your fellow drivers have to say about texting while driving and other distractions.</p>
                      <p><a title="See infographic on the Allstate Blog"  target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/distracted-driving-staying-safe-on-the-road-infographic/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('How To Avoid Drowsy Driving')"><span>See infographic</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents">

                      <img title="Steps to take after a car crash" alt="See our checklist of things you should do after you get in a car crash" src="img/carousel/mobile/WhatToDoAfterAnAccident.jpg" width="222" height="244" />
                      <h3><a title="Read article on the Tools and Resources section of this site" target="_blank"  href="https://www.allstate.com/tools-and-resources/car-insurance/in-case-of-a-car-accident.aspx?intcid=ABD|carousel|Accident" onclick="javascript:trackCustom_scLV('What To Do After An Accident')">What To Do After An Accident.</a></h3>
                      <p>Should you call the police? Should you move your car? Learn what to do after a collision.</p>
                      <p><a title="Read article on the Tools and Resources section of this site"  target="_blank" class="btn-cta-sm" href="https://www.allstate.com/tools-and-resources/car-insurance/in-case-of-a-car-accident.aspx?intcid=ABD|carousel|Accident" onclick="javascript:trackCustom_scLV('What To Do After An Accident')"><span>Read article</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents">

                      <img title="Different seasons call for different maintenance to your vehicle" alt="Get a checklist of things you should do to prepare your car for any season" src="img/carousel/mobile/SevereWeatherDrivingPrep.jpg" width="222" height="244"  />
                      <h3><a title="Read article on the Allstate Blog" target="_blank" href="http://blog.allstate.com/preparing-for-four-seasons-of-severe-weather-driving/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Safety Tips For Driving At Night')">Severe Weather Driving Prep.</a></h3>
                      <p>These seasonal car maintenance tips will keep your car in great shape in any climate, all year.</p>
                      <p><a title="Read article on the Allstate Blog" target="_blank" class="btn-cta-sm" href="http://blog.allstate.com/preparing-for-four-seasons-of-severe-weather-driving/?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Safety Tips For Driving At Night')"><span>Read blog article</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
              <div class="slides-inner">
                <div class="slide-bot" style="width:100%">
                  <div class="slide">
                    <div class="slideContents">

                      <img title="Many factors affect your auto insurance premium" alt="See the factors that influence how much it costs to insure your car" src="img/carousel/mobile/WhatAffectsYourPremium.jpg" width="222" height="244" />
                      <h3><a title="Read article on the Tools and Resources section of this site" target="_blank" href="https://www.allstate.com/tools-and-resources/car-insurance/factors-affect-your-auto-insurance.aspx?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Accident Avoidance Tips')">What Affects Your Premium?</a></h3>
                      <p>Many factors—from your age to your driving record—impact the cost to insure your car. See how.</p>
                      <p><a title="Read article on the Tools and Resources section of this site" target="_blank" class="btn-cta-sm" href="https://www.allstate.com/tools-and-resources/car-insurance/factors-affect-your-auto-insurance.aspx?intcid=TBD|carousel|offer" onclick="javascript:trackCustom_scLV('Accident Avoidance Tips')"><span>Read article</span></a></p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="resp-slides-nav"></div>
          <a class="resp-slides_prev">Previous</a>
          <a class="resp-slides_next">Next</a>
        </div><!-- // .respFreeTextScroller -->

      </div><!-- // .FreeTextScroller -->





      <hr class="desktop" />

      <div class="legal">The Allstate America's Best Drivers Report<sup class="superscript">&reg;</sup> tabulates property damage frequency of Allstate insured drivers from 2013-2014.The report analyzes the 200 largest cities from the U.S. Census Bureau's Annual Estimates of the Population for Incorporated Places over 50,000, measured for 2014 as of July 1, 2015. In prior years, neighboring cities that shared zip codes also shared rankings. This only impacted a minimal number of cities; however, since 2014, the report used geolocation to increase accuracy and there are no longer shared rankings. U.S. Census Bureau data was used to obtain the population density factor. For the precipitation factor, National Oceanic and Atmospheric Administration (NOAA) data was utilized. Allstate Drivewise<sup class="superscript">&reg;</sup> data is based on Allstate customers voluntarily enrolled in the telematics program from 2010-2015. A number of cities from the full 200 Best Drivers rankings are excluded in the Drivewise data due to the limited measurable data available, or because Drivewise was not available (California, North Carolina, South Carolina and Texas). The Allstate Best Drivers Report is produced solely to boost the country's discussion about safe driving and to increase awareness of the importance of being safe and attentive behind the wheel. The report is not used to determine auto insurance rates. </div>

    </div><!--//#content-->

    <!-- End Page Center Content Section -->

    <!--[if lte IE 7]>
    </div>
    <![endif]-->
    <!--[if lte IE 8]>
    </div>
    <![endif]-->
    <!--[if IE 9]>
    </div>
    <![endif]-->
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/fastclick.js"></script>
    <!-- <script type="text/javascript" src="js/jqmodal.js"></script> -->
    <script type="text/javascript" src="js/easy-paginate-custom.js"></script>
    <script type="text/javascript" src="js/jquery.cycle.all.min.js"></script>
    <script type="text/javascript" src="js/jquery.cj-swipe.min.js"></script>
    <script type="text/javascript" src="js/jquery.selectBox.min.js"></script>
    <script type="text/javascript" src="js/best_driver.js"></script>
    <script type="text/javascript" src="js/global.js"></script>

    <!-- JVECTOR -->
    <script src="js/jquery-mousewheel.js"></script>
    <script src="js/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="assets/jquery-jvectormap-us-aea-en.js"></script>
    <script src="assets/knockout.js"></script>
    <script src="assets/knockout-switch-case.min.js"></script>

    <script src="https://use.fontawesome.com/934103e5b8.js"></script>
    <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="assets/data.js"></script>

    <script src="js/jquery-ui-1-11-4.js"></script>
    <!-- END JVECTOR -->

    <!-- Gigya -->
    <script src="js/social.js"></script>
    <!-- END Gigya -->

    <!-- Kaltura -->
    <script src="//cdnapi.kaltura.com/p/1437641/sp/143764100/embedIframeJs/uiconf_id/14091641/partner_id/1437641"></script>
    <!-- END Katulra -->

    <!-- SiteCatalyst code version: H.22.1.
    Copyright 1996-2011 Adobe, Inc. All Rights Reserved
    More info available at http://www.omniture.com -->
    <script language="JavaScript" type="text/javascript">
      var s_account="allstatedevelopment";
    </script>
    <script language="JavaScript" type="text/javascript" src="//www.allstate.com/includes/s_code.js"></script>
    <script language="JavaScript" type="text/javascript">

      var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

      <!--
      s.pageName = "TBD";
      s.server = "www.allstate.com";
      s.channel = "/abd/";
      s.prop10 = "";
      s.prop12 = "";
      s.prop13 = "";
      s.prop14 = "";
      s.eVar10 = "";
      var s_code=s.t();if(s_code)document.write(s_code);
      //-->
    </script>
    <script language="JavaScript" type="text/javascript"><!--
      if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
      //-->
    </script>
    <noscript>
      <img src="http://allstate.122.2o7.net/b/ss/allstatedevelopment/1/H.22.1--NS/0" height="1" width="1" border="0" alt="" />
    </noscript><!--/DO NOT REMOVE/-->
    <script src="js/sitecatalyst.js"></script>

    <!-- END SiteCatalyst -->
  </body>
</html>
