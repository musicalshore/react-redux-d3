![T-3 icon](http://t3-assets.uat-l.thethinktank.com/images/T3logo.png)
- - -
# Technical Documentation
**Prepared by:**  Joshua Brewer<br />
**Updated by:** Michael Russo<br />
**Last Updated:**  04/17/2017<br />
**Version**: v4.0.0


| Client    | Project                                    |
|-----------|--------------------------------------------|
| Allstate  | America's Best Driver                      |

See Allstate-dev-readme.txt for information on new map and content. 

Note: Below here is legacy page (and now removed old map) info:


- - -
## Table of Contents
1. Overview
  * a. Static Page
  * b. Interactive Map
  * c. JSON File
  * d. Repository
2. Team
3. Technical Architecture
4. Assets
5. Deployment Strategy
  * URLs
6. QA
7. Changelog
- - -

## 1. Overview
A landing page that will live on the client's CMS (LiveSite `LS`). Included is a reusable interactive map that can be repurposed annually.

### a. Static Page
* Leverage past Static Pages already delivered:

		https://<USERNAME>@stash.t-3.com/scm/al/website.git
* YouTube Video Embed (already available)
* Carousel (already available)
* Twitter `Share`

		<div id="custom-tweet-button">
		  <a href="https://twitter.com/share?url=https%3A%2F%2Ftwitter.com%2Fpages%2Ftweet-button" target="\_blank">Tweet</a>
		</div>  

* Downloadable PDFs
  * `<a>` for Full Report is on `Line 296`
  * `<a>` for Infographic is on `Line 300`

### b. Interactive Map
* Loads `JSON`
  * Use localStorage for cacheing.
  * <font color="red"><strong>ATTENTION</strong></font> — May have to include entire object within JS file due to `LS` support. Waiting on client to provide update.
* `Tabs` (Filters)
  * Each Filter has separate color scheme
* `Filter List`
  * List is updated and scrolled to the top on any `Filter` change
  * Year Selector dropdown for viewing older data.  Is only active on Top Cities
  * Clicking on city from list will activate `Pop-up` on map
* `Markers` (Circles) size varies based on Ranking
  * Clicking on a `Marker` will display a `Pop-Up`
  * `Markers` should have an active state
  * Green `markers` note cities that have joined or rejoined the list
  * Yellow `markers` note which city hast improved the most
* `Pop-up` displays detailed information from data all Rankings (2014) that are found in all Filters.
  * 2015 will display all rankings that can be found under other `Tabs`, as well as Drivewise® Braking Events
  * 2014 will display the same information as 2015, sans Drivewise® Braking Events
  * 2005-2013 will only display Top Cities (Best Driver) data
  * Dismissed by clicking close button or anything outisde of `Pop-up`
  * Should never display more than 1 at the same time
  * Any active `Pop-up` should be dismissed when navigating through different `Tabs`
* Social `Share`
  * Can Share the app itself
  * `Pop-Up` has separate `Share` Button based on Ranking.
    * `Share` message is Dynamic
	* `Share` message may be edited in `deploy/best_driver/js/social.js`

| Gigya Simple Share    | http://developers.gigya.com/040_Demos/020_Social_Plugins/0355_Share            |
|-----------------------|--------------------------------------------------------------------------------|
|                       | http://developers.gigya.com/040_Demos/020_Social_Plugins/033_Share_Bar_Plugin  |
| API KEY               | 3_Uk95Mmi5mBePVs-6Y5rUJH3o6duMRC8WmoWuEB9aw-Vcg89IK3ojb3Y9Dp4T8hLT             |


* Map supports Zooming and Panning
  * Zoom Max of 4 - 2 Marker sizes; top 10 for Large and the rest is small.
    * `Zoom Level1 - 1-10 Markers show numbers`
    * `Zoom Level2 - All Markers show numbers + Major city names`
    * `Zoom Level3 - All Markers show numbers + More city names`
    * `Zoom Level4 - All Markers show number + All city names`
  * Zoom Level indicator. States (Levels) between the +/- does not have to be clickable.
  * Zoom needs to be increased to cover more ground
    * `Zoom Level1 - US`
    * `Zoom Level2 - Regional`
    * `Zoom Level3 - State`
    * `Zoom Level4 - City`
	* Clicking on a city name from the `Filter List` while Zooomed in will zoom back out and activate `Pop-up`
* Geolocation Support - Initialize app with City and State
  * Sample
		var map = new bestDriver('Austin, TX');


### c. JSON

* Needs 2005-2015 Rankings
* Consider data that needs to be filtered by years and categories; Top Cities (Best Drivers), Population Density, Rain and Snow, and Drivewise® Braking Events (if necessary)
* Sample
		"City":"Akron",
		"State":"OH",
		"Lat":41.081,
		"Lon":-81.519,
		"2005 Top Cities":37,
		"2006 Top Cities":24,
		"2007 Top Cities":31,
		"2008 Top Cities":14,
		"2009 Top Cities":18,
		"2010 Top Cities":32,
		"2011 Top Cities":49,
		"2012 Top Cities":58,
		"2013 Top Cities":52,
		"2014 Top Cities":74,
		"2014 Population":88,
		"2014 Population Density":70,
		"2014 Rain & Snow":68,
		"2014 All Conditions":75,
		"2015 Top Cities":54,
		"2015 Change":20,
		"2015 Average Years Between Accidents":9.6,
		"2015 Accident Likelihood":4.1,
		"2015 Population Density":54,
		"2015 Rain & Snow":51,
		"2015 Braking Events":14.1,
		"Zoom Level2":"",
		"Zoom Level3":"",
		"Zoom Level4":""

### d. Repository
The GIT repository is located at:

		https://gitlab.t-3.com/allstate/americas-best-drivers


<br/>
- - -
## 2. Team

| Job                   | Teammember            | Key
|-----------------------|-----------------------|------
| Producer:             | Katie Webb            | KW
| Developer:            | Hamilton Pytluk       | HP

- - -
## 3. Technical Architecture
### a. Overview
Desktop, Tablet, and Mobile optimized

### b. Specifications

#### Libraries and Guidelines A.com is using that T3 is aware of:

| Files                 | Version   | Details
|-----------------------|-----------|---------
| StyleSheet            | SASS      | CSS is written via SASS and converted via command line.  The site does not support CSS3. Use Descendent Selectors with caution (nesting). CSS needs to be modularized so that ADT can easily grab CSS snippets.
| JQuery                | 1.9.1     | Fast, small, and feature-rich JavaScript library
| Touchswipe            | 1.6.5     | TouchSwipe is a jquery plugin to be used with jQuery on touch input devices such as iPad, iPhone etc
| Cycle Plugin          | 3.0.3     | A slideshow plugin that supports many different types of transition effects
| jqModal               | 1.1.0     | Help you display modals, popups, and notices
| HTML                  | HTML4     | 

#### Libraries needed for this project:

| Files                 | Version   | Details
|-----------------------|-----------|---------
| jVectorMap            | 1.2.2     | An interactive map that only uses native browser technologies like JavaScript, CSS, HTML, SVG or VML

- - -
## 4. Assets

<br/>
- - -
## 5. Deployment Strategy
Developer should always branch from `development`. Only `DV` can merge back to `Master`. Unless stated otherwise, there must be a Pull Request for all commits. Because of `LS` integration, code should <b>NOT</b> be minified unless it's a Library.

### a. Merging
Always merge to `Internal` for Art and QA Review. When approved should you then merge to `UAT` for client review. `Bamboo` polls all `Internal` merges and will auto-deploy. `UAT` will require a manual build (see URLs).

Internal Branch

	release/internal

UAT Branch

	release/uat

### b. URLs
| Site                    | URL
|-------------------------|-----------------------
| __UAT (Staging)__       | http://allstate-abd.uat.thethinktank.com/

| Username                | Password
|-------------------------|-----------------------
| allstateuser            | @ll.State!

- - -
## 6. QA
* __Desktop__
	* Windows - IE8+
	* OSX - Safari (Latest)
	* Both - Firefox (Latest), Chrome (Latest)

- - -
## 7. Changelog
* v1.0.0 - Initial TDD
* v2.0.0 - 2015 Updates
  * Added Year Selector dropdown
  * Added green marker for cities that are new or have rejoined the list
  * Added orange marker for cities that improved the most
  * Merged 'Population' with 'Density'
  * Removed 'All Conditions' tab
  * Removed the timeline selector under the map
