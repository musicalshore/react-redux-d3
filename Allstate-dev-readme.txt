
This output page that is compiled to dist is comprised of the legacy dev content from previous years with a completely rebuilt map module integrated.



##########
Building and general settings
----------
The new map module is a react app and is compiled using Webpack.  The legacy page content around the map module is the same as previous years with some minor copy and other tweaks/bug fixes. 

Required Software for building new map module:
Yarn https://yarnpkg.com/lang/en/docs/install/
NPM https://www.npmjs.com/


The export and build settings are in webpack.  Of particular note is the publicPath setting which can be used to prepend path into the dist output.  Right now it's set to '' to work with a relative path.  The setting is in both production config files: webpack.config.production-map-only.js and webpack.config.production.js

To create the dist that compiles the new map and combines it with the legacy page code:

`yarn install && npm run build`

This will create the stand alone page, map module and other assets in the 'dist' folder.

To compile the map without the legacy content (also to the 'dist' folder)

'yarn install && npm run build-map-only'


##########
Map Source
----------

The individual map components are all in src/components. The naming convention is pretty self explanatory for tracking individual components down.  

The json data file has been heavily reoganized to work better with the new map framework.  

##########
Mobile zip selector to see where your city ranks:
----------

Attempts to display the current city ranking using the following methods.  In any case where ranking data is not found, it displays "Your city is not ranked" and gives them the opportunity to enter a zipcode.  We're tapping into the existing zip data if possible here.  

1) On page render pass the current customer's city, state into the app to set the cityState prop like so from the :
      <div id="app" class="app-container"  data-city-state="Kansas City, MO"></div>

2) If LocalAgentsZip is in localStorage, it looks up the city using Google Geocode, than looks up the ranking data. 

3) If the user edits the zipcode, it does a geocode lookup via google.

The location of the google key is in constants/maps.js

##########
Map Dev Server
----------

To run the local dev server for the map:

`yarn install && npm run start`

The output will show you the url.

