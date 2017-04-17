var onTab = $('.selected.tab').attr('id'),
    theYear = 2016,
    newLocationColor = '#6db33f',
    mostImprovedColor = '#f3c303',
    items;

$(document).ready(function() {

  $('.topCities.section').hide();
  $('.selected-year').html(theYear);

  var prevYear = 'previous-year',
      nextYear = 'next-year',
      oldYear = 'oldest-year',
      newYear = 'newest-year';

  function Locations(data) {
    this.location = ko.observable(data);
  }

  function filterLocations(type, year) {
    if (year==''){
      type = type;
    }
    else{
      type = year + ' ' + type;
    }

    var clonedArray = jQuery.extend(true, {}, model.viewModel.savedLocations()); //get all the data
    var currentType = type; //get the filter
    var clonedArray = ko.utils.arrayFilter(new model.viewModel.savedLocations(), function(item) {
      return item.location()[type] !== null && item.location()[type] !== -1;
    }); //get the location that has no nulls.
    var m = clonedArray.sort(function(left, right) {
      return left.location()[type] == right.location()[type] ? 0 : (left.location()[type] < right.location()[type] ? -1 : 1);
    });
   model.viewModel.locations(m);
   setTopMarkers(10);
  }


  function setTopMarkers(numberCount) {
    var markerData = model.viewModel.map.markers; //[0].config.dataObj;
    for (var i = 0; i < numberCount; i++) {
     for (var j in markerData) {
       if (markerData[j].config.dataObj[model.viewModel.year()+' '+model.viewModel.type()] == i+1) {
          model.viewModel.map.setSelectedMarkers(j);
          $('circle[data-index="'+i+'"]').css('fill', model.viewModel.color);
       }
     };
    };
  }

  function formatMarkers(markerList, type) {

   var markers = [];

    for (var i = 0; i < model.viewModel.locations().length; i++) {

      var markerColor,
          markerStrokeColor,
          markerClass,
          newLocation = false,
          mostImproved = false;

      if(model.viewModel.locations()[i].location().New) newLocation = true;
      if(model.viewModel.locations()[i].location().Improved) mostImproved = true;

      if(onTab == 'topCity' && theYear == 2016) {
        if(newLocation) {
          markerColor = newLocationColor;
          markerStrokeColor = newLocationColor;
          markerClass = 'new-location';
        } else if(mostImproved) {
          markerColor = mostImprovedColor;
          markerStrokeColor = mostImprovedColor;
          markerClass = 'most-improved';
        } else {
          markerColor = model.viewModel.color;
          markerStrokeColor = model.viewModel.strokeColor;
          markerClass ='';
        }
      } else {
        markerColor = model.viewModel.color;
        markerStrokeColor = model.viewModel.strokeColor;
        markerClass ='';
      }

      markers.push({'style': {fill: markerColor, stroke: markerStrokeColor, class: 'jvectormap-marker jvectormap-element '+markerClass },'dataObj':model.viewModel.locations()[i].location(), 'id':true, 'latLng': [model.viewModel.locations()[i].location().Lat, model.viewModel.locations()[i].location().Lon], 'name': model.viewModel.locations()[i].location().City +", " + model.viewModel.locations()[i].location().State});
    }

    return markers;
  }

  function bringMarkerToTop(index) {
     var path = $('circle[data-index="'+index+'"]');
     var pathParent  = $('circle[data-index="'+index+'"]').parent();
     var text = '<svg class="textSvg"><text data-index="'+index+'" text-anchor="middle"  x="'+path.attr('cx')+'" y="'+(parseInt(path.attr('cy'))+4)+'" style="fill: #fff; font-size: 11px;">'+(parseInt(index)+1)+'  </text></svg>';
     if (path.attr('r') > 5) {
       $(pathParent).append(path);
       $(pathParent).append(text);
     };
  }

  function panMapToMarkers() {

    //SHOULD FIGURE OUT HOW TO PAN WITHOUT GOING TO TOP LEVEL ZOOM
    var lat = model.viewModel.currentActiveLocation().Lat;
    var lng = model.viewModel.currentActiveLocation().Lon;
    var scale = 4;
    var mapObj = model.viewModel.map;
    mapObj.setScale(0);
    var foo = mapObj.latLngToPoint(lat,lng);
    var w = (foo.x - 25) / mapObj.width;
    var h = foo.y / mapObj.height;
    mapObj.setFocus(scale, w, h);
  }

  function setMap(color, strokeColor) {
    var regionStyling = {initial: {fill: '#e8e8e8'},hover: {fill: "#666"}};
    var color = color || '#0096d6';
    var strokeColor = strokeColor || '#fff';
    var map = new jvm.WorldMap({
      container: $('.map'),
      zoomStep: 2,
      zoomOnScroll: false,
      map: 'us_aea_en',
      backgroundColor: '#fff',
      regionStyle:regionStyling,
      markerStyle: {
        initial: {
          stroke: strokeColor
        },
        selected: {
          r: 16,
          fill: color
        },
      },
      markers: [],
      regionsSelectable: false,
      markersSelectable: false,
      markersSelectableOne: false,

      onMarkerLabelShow: function(event, label, index){
        // // console.log(label);
        label.html(
          '<div class="labelContainer">'+ label.html() +'</div>'
          );
        // return false;
      },
      onMarkerOver: function(event, index){
        // console.log('marker-over', index);
        bringMarkerToTop(index);
        return false;
      },
      onMarkerOut: function(event, index){
        // console.log('marker-out', index);
        return false;
      },
      onMarkerClick: function(event, index){
        model.viewModel.shouldScroll = true;
        model.viewModel.lastMarkerClicked = index;
        var obj = model.viewModel.map.markers[index].config.dataObj[model.viewModel.year()+' '+model.viewModel.type()];

        $('.toplistings ul li[idx="'+obj+'"]').click();
        bringMarkerToTop(index);
        event.stopPropagation();
        event.preventDefault();

        var el = $('circle[data-index="'+index+'"]'),
            markerColor;
        if(el.attr('class').indexOf('new-location') >= 0) {
          markerColor = newLocationColor;
        } else if(el.attr('class').indexOf('most-improved') >= 0) {
          markerColor = mostImprovedColor;
        } else {
          if(onTab == 'topCity') {
            markerColor = '#05436a';
          } else {
            markerColor = model.viewModel.color;
          }
        }
        el.css({'fill':markerColor,'stroke':markerColor});

        return;
      },
      onMarkerSelected: function(event, index, isSelected, selectedMarkers){
        bringMarkerToTop(index);
      },
      onRegionLabelShow: function(event, label, code){
        label.html(label.html());
        return false;
      },
      onRegionOver: function(event, code){
        // console.log('region-over', code, map.getRegionName(code));
        return false;
      },
      onRegionOut: function(event, code){
        // console.log('region-out', code);
      },
      onRegionClick: function(event, code){
        // console.log('region-click', code);
      },
      onRegionSelected: function(event, code, isSelected, selectedRegions){
        // console.log('region-select', code, isSelected, selectedRegions);
        if (window.localStorage) {
          window.localStorage.setItem(
            'jvectormap-selected-regions',
            JSON.stringify(selectedRegions)
          );
        }
      },
      onViewportChange: function(e, scale, transX, transY){

        $('.jvectormap-container .labelSvg text').each(function(index, item) {
          var itemPicked = $(item).data('index');
          var x = $('.jvectormap-container circle[data-index="'+itemPicked+'"]').attr('cx');
          var y = $('.jvectormap-container circle[data-index="'+itemPicked+'"]').attr('cy');
          var xInt = parseInt(x) + 20;
          var yInt = parseInt(y) + 5;
          $(item).attr('x',xInt);
          $(item).attr('y',yInt);
        });
        $('.jvectormap-container .textSvg text').each(function(index, item) {
          var correctIndex = $(item).data('index');
          var x = $('.jvectormap-container circle[data-index="'+correctIndex+'"]').attr('cx');
          var y = $('.jvectormap-container circle[data-index="'+correctIndex+'"]').attr('cy');
          var yInt = parseInt(y) + 4;
          $(item).attr('x',x);
          $(item).attr('y',yInt);
        });

        window.a = window.a + 1 || 0;
        var scalefactor = 0;
        if (window.a > 0) {
          if (scale > 0 && scale < 2.0) {
            // console.log('US');
            scalefactor = 1;
          }
          else if(scale >= 2 && scale < 3.7) {
            // console.log('region');
            scalefactor = 2;
          }
          else if(scale >=3.7 && scale < 5) {
            // console.log('state');
            scalefactor = 3;
          }
          else if(scale >= 5 && scale <= 8) {
            // console.log('city');
            scalefactor = 4;
          }
          if (scalefactor !== model.viewModel.scalefactor()) {
            model.viewModel.scalefactor(scalefactor);
          };
        };
          // console.log(scalefactor);
        $('#zoom-bar').slider('value', '' + scalefactor + '');

        $('circle').each(function(){
          var el = $(this);
          if(onTab == 'topCity') {
            if(el.attr('class').indexOf('new-location') >= 0) {
              markerColor = newLocationColor;
            } else if(el.attr('class').indexOf('most-improved') >= 0) {
              markerColor = mostImprovedColor;
            } else {
              markerColor = model.viewModel.color;
            }
          } else if(onTab == 'density') {
            markerColor = '#e6527a';
          } else if(onTab == 'rainSnow') {
            markerColor = '#6d5dc9';
          }
          el.css('fill',markerColor);
        });

      }

    });
    return map;
  }



 //Handle Markers on Scale ---------------------------------
  function setScaleInformation(scaleFactor) {
    $('.labelSvg').remove();
    if (scaleFactor == 2 || scaleFactor == 3 || scaleFactor == 4) {
        if (model.viewModel.allMarkersUpdated() !== true) {
          model.viewModel.allMarkersUpdated(true);
        }
        model.viewModel.map.clearSelectedMarkers();
        handleMarkersAndText(scaleFactor);
      };

     if(scaleFactor == 1 || scaleFactor == 0) {
      model.viewModel.allMarkersUpdated(false);
      model.viewModel.map.clearSelectedMarkers();
      $('.jvectormap-container text').remove();
      setTopMarkers(10);
    }
  }

  function setMarkerSelected(i) {

    var path = $('circle[data-index="'+i+'"]');
    var pathParent  = path.parent();
    var color = model.viewModel.selectedColor() || '#073F6E';
    var text = '<svg data-index="' + i + '" class="labelSvg" width="100%" height="100%"><g data-index="' + i + '" ><rect data-index="' + i + '" width="' + (model.viewModel.locations()[i].location().City.length * 13) + '" height="0" style=\"fill: #ffffff; fill-opacity: 0;\"' + '" text-anchor="left" x="' + (parseInt(path.attr('cx')) + 18) + '" y="' + (parseInt(path.attr('cy')) - 20) + '"' + '></rect><text data-index="' + i + '" text-anchor="left" x="' + (parseInt(path.attr('cx')) + 20) + '" y="' + (parseInt(path.attr('cy')) + 5) + '" style="fill: ' + color + '; font-family: \'Open Sans\' font-size: 1em;">' + model.viewModel.locations()[i].location().City + '</text></g></svg>';
    model.viewModel.map.setSelectedMarkers(i);

    $(pathParent).append(text);

  }

  function handleMarkersAndText(scaleFactor) {
    for (var i = 0; i < model.viewModel.locations().length; i++) {
        //if (model.viewModel.locations()[i].location()['Zoom Level'+scaleFactor+''] == 'Y' || i < 11) {
      if (model.viewModel.locations()[i].location()['Zoom Level' + scaleFactor + ''] == 'Y') {
        setMarkerSelected(i);
      }
      else {
        $('text[data-index="'+i+'"]').remove();
      }
    };
  }

//Handle Markers on Scale ---------------------------------


  //THIS IS THE MODEL ---------------------------------
  function TaskListViewModel() {

    var self = this;
    self.type =  ko.observable("Top Cities");
    self.initialLoadType =  ko.observable("2016 Top Cities");
    self.id =  ko.observable("topCity");
    self.byline = ko.observable("Explore cities that are least likely to experience collisions.");
    self.year =  ko.observable("2016");
    self.yearFomattedTopDriver = ko.observable(self.year() + ' Top Cities');
    self.selectedColor = ko.observable("#073F6E");
    self.color = '#0096d6';
    self.strokeColor = '#43c7ff';
    self.locations = ko.observableArray([]);
    self.savedLocations = ko.observableArray([]);
    self.allMarkersUpdated = ko.observable(false);
    self.scalefactor = ko.observable(1);
    self.map = setMap();
    self.currentActiveLocation = ko.observable({});

    self.formattedNumber = function(n) {
        return n + '<sup>' + ([, 'st', 'nd', 'rd'][~~(n / 10 % 10) - 1 ? n % 10 : 0] || 'th') + '</sup>';
    };

    self.aValue = function(n) {
        return Math.abs(n);
    };

    self.popModal = function(currentLocation,e, shouldScrollList) {

      $('.toplistings ul li.active').removeClass('active');
      $(e.currentTarget).addClass('active');

      var oldColor = $('circle').css('fill');
      if(onTab !== 'topCity') {
        $('.badgeWrapper, .change-year').hide();
        if(onTab == 'density') {
          $('circle').css('fill',oldColor);
          $('.densityLine').show();
          $('.rainSnowLine').hide();
        } else {
          $('circle').css('fill',oldColor);
          $('.densityLine').hide();
          $('.rainSnowLine').show();
        }
      } else {
        $('.badgeWrapper, .change-year').show();
        $('circle').css('fill',oldColor);
        $('.densityLine, .rainSnowLine').hide();
      }

      if (self.shouldScroll) {
        var pos= ($('.toplistings').scrollTop()+$('li.active').position().top - 190);
        $(".toplistings").animate({ scrollTop: pos }, 500);
        self.shouldScroll = false;
      };

      if($('body').hasClass('is-mobile')){

        $('.modal').css({
          'top': 48,
          'left': 0,
          'background': '#f5f5f5',
          'border': 0,
          'width': '100%',
          'height': 405
        });

      } else {

        $('.modal').css({
          // 'left': '15%',
          'background': null,
          'border': 'solid 5px ' + self.color + '',
          'width': 320,
          'height': null
        });
        if(self.year() < 2016){
          // $('.modal').css('top', '41%');
          $('.shareContainer, #cityShare').hide();
        } else {
          // $('.modal').css('top', '21%');
          $('.shareContainer, #cityShare').show();
        }

      }

      $('.tabContentMap').addClass('show-modal');
      self.currentActiveLocation(currentLocation.location());
      panMapToMarkers();

      var windowHeight = $('.toplistings ul').height();
      var currentTop = $('.toplistings').scrollTop();

      var markerIdx = model.viewModel.lastMarkerClicked ? model.viewModel.lastMarkerClicked : null;
      var markerData = model.viewModel.map.markers;
      if (!markerIdx) {
        for (var j in markerData) {
          if (markerData[j].config.dataObj[model.viewModel.year()+' '+model.viewModel.type()] == currentLocation.location()[model.viewModel.year()+' '+model.viewModel.type()]) {
            var markerIdx = j;
          }
        };
      };

      var currentClasses = $('circle[data-index="' + markerIdx + '"]').attr("class");

      var markerColor;
      if(model.viewModel.currentActiveLocation().New && theYear == '2016') {
        markerColor = newLocationColor;
      } else if(model.viewModel.currentActiveLocation().Improved && theYear == '2016') {
        markerColor = mostImprovedColor;
      } else {
        markerColor = model.viewModel.color;
      }

      $('circle[data-index="'+markerIdx+'"]').attr("class", currentClasses +" panned-to");
      setMarkerSelected(markerIdx);

      // Add City Label
      $('text[data-index="' + markerIdx + '"]').each(function (index) {

        if ($(this).text() === model.viewModel.currentActiveLocation().City) {

          var styles = $(this).attr("style");
          $(this).attr("old-style", styles);
          $(this).attr("style", "font-family: 'Open Sans',sans-serif; font-size: 15pt; font-weight: 600; color: #333333;");
          var rect = $(this).prev();

          if (rect) { // Label Background
            if (rect[0].nodeName === "rect") { // Make sure we are acting on the rectangle
              rect.attr("height", "40");
              rect.attr("width", ($(this).width() + 5));
            }
          }

        }

      });

      model.viewModel.lastMarkerClicked = null;

      // Set the city specific social share copy
      var city = model.viewModel.currentActiveLocation().City;
      var state = model.viewModel.currentActiveLocation().State;
      var rank = model.viewModel.formattedNumber(model.viewModel.currentActiveLocation()[model.viewModel.year() + ' ' + model.viewModel.type()]);
      $('#cityShare').html('<a href="#" data-share="'+shareCopy+'">'+baseShare);
      $('#cityShare a').on('click', function(e){
        e.preventDefault();

        if( onTab == 'density' ){
          var shareCopy = encodeURIComponent(setRSPShare(city, state, rank, 'pop', false));
          var twCopy = encodeURIComponent(setRSPShare(city, state, rank, 'pop', true));
          var fbTab = '&tab=density';
        } else if( onTab == 'rainSnow' ){
          var shareCopy = encodeURIComponent(setRSPShare(city, state, rank, 'rs', false));
          var twCopy = encodeURIComponent(setRSPShare(city, state, rank, 'rs', true));
          var fbTab = '&tab=rainandsnow';
        } else {
          var shareCopy = encodeURIComponent(setCityShare(city, state, rank));
          var twCopy = encodeURIComponent(setTwitterShare(city, state, rank));
          var fbTab = '';
        }

        var baseShare = '<span class="share-text">Share</span><img src="img/icons/icon-share.png" alt="Share this ranking" /></a>';
        // var baseURL = 'https://www.allstate.com/tools-and-resources/americas-best-drivers.aspx';
        var baseURL = 'http://allstate-abd.uat.thethinktank.com/';
        var fbPrep = baseURL+'?city='+city+'%2C%20'+state+'&rank='+rank.replace('<sup>','').replace('</sup>','')+'&year='+theYear+fbTab;
        var fbShare = 'https://www.facebook.com/sharer/sharer.php?u='+fbPrep;
        var twShare = 'https://twitter.com/share?text='+twCopy;
        var inShare = 'https://www.linkedin.com/shareArticle?mini=true&url='+baseURL+'&title=Allstate America\'s Best Drivers Report&summary='+shareCopy;
        var mailShare = 'mailto:your@email.com?subject=Allstate America\'s Best Drivers Report&body='+shareCopy+' '+baseURL;
        var shareCircles = '<a href="'+fbShare+'" class="share-circle share-fb"><i class="fa fa-facebook" aria-hidden="true"></i></a><a href="'+twShare+'" class="share-circle share-twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a><a href="'+inShare+'" class="share-circle share-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a><a href="'+mailShare+'" class="share-circle share-email"><i class="fa fa-envelope" aria-hidden="true"></i></a>';

        if($('.popover').length){
          $('.popover').remove();
          $(this).html(baseShare);
        } else {
          $('<div class="popover" />').html('Share '+shareCircles).appendTo('#cityShare');
          $(this).html('Close &nbsp; X');
        }
        $('a.share-circle').attr('target','_blank');
      });
      e.stopPropagation();

      //SiteCatalyst Tag
      trackCustom_scLV(model.viewModel.currentActiveLocation().State + ":" + model.viewModel.currentActiveLocation().City);

      $('a.drivewise-information').on( "vmouseout", function() {
        $(this).off('hover');
      });

    }//self.popModal

    $.getJSON("assets/best-driver.json", function(allData) {
      var mappedTasks = $.map(allData, function(item) { return new Locations(item) });
      var year = '';
      self.locations(mappedTasks);
      self.savedLocations(mappedTasks);
      filterLocations(self.initialLoadType(), year);
      addZoomBar();
    });

  }//TaskListViewModel

    //expose the model and bind
    model = { viewModel: new TaskListViewModel() };
    ko.applyBindings(model.viewModel);

    //Subscribe to the model to listen for changes and update map markers
    model.viewModel.locations.subscribe(function(newValue) {
      var markers = formatMarkers(newValue);
       model.viewModel.map.removeAllMarkers();
       model.viewModel.map.addMarkers(markers);
       $('.jvectormap-container .textSvg text').remove();
    });

    model.viewModel.scalefactor.subscribe(function(newValue) {
      setScaleInformation(newValue);
    });
 //END OF MODEL ---------------------------------

    //UI EVENTS
    $('.jvectormap-zoomin, .jvectormap-zoomout').on('click', function(e) {
        closeModal(e);
    });

    function yearSelector(mobileYear){

      var yearString = 'Top Cities';
      if(!mobileYear){
        $('.year-selector').selectBox().change(function (event) {
          closeModal(event);
          $(".toplistings").scrollTop(0);
          $('.tabContentMap').removeClass('show-modal');
          //need to reset the map to be back at the US view.


          var mapObject = $('.map').vectorMap('get', 'mapObject');
          mapObject.setScale(0);

          var val = $(this).val();
          theYear = val;
          if(theYear < 2014) {
            $('.legendContainer, .gt2014').hide();
            $('#density, #rainSnow').addClass('inactive');
            $('.lt2014').show();
          } else if(theYear < 2016) {
            $('.legendContainer, .lt2014').hide();
            $('#density, #rainSnow').addClass('inactive');
            $('.gt2014').show();
          } else {
            $('.legendContainer').show();
            $('#density, #rainSnow').removeClass('inactive');
            $('.gt2014, .lt2014').hide();
          }

          filterLocations(yearString, val);
          model.viewModel.type(yearString);
          model.viewModel.year(val);
          model.viewModel.yearFomattedTopDriver(val +' '+ yearString);

          $('.selected-year').html(val);
          if(val < 2016) {
            $('a.next-year').removeClass(newYear);
          } else if(val > 2007) {
            $('a.next-year').removeClass(oldYear);
          }

    		});
      } else {
        filterLocations(yearString, mobileYear);
        model.viewModel.type(yearString);
        model.viewModel.year(mobileYear);
        model.viewModel.yearFomattedTopDriver(mobileYear +' '+ yearString);
      }

    } yearSelector();

    function resetList(){
      cur = 0;
      $('.mobile-wrap ul').css('margin-top',0);
      $('.previous-item').addClass('oldest-item');
      $('.next-item').removeClass('newest-item');
    }

    // Click a tab...
    var tabs = $( "#tabs .tab" );
    tabs.on('click', function(e) {

      if( $(this).hasClass('inactive') ){
        e.preventDefault();
        return false;
      }

      var tab = $(e.currentTarget);
      var id = tab.attr('id'),
          sectionColor = tab.data('color'),
          type = tab.data('type'),
          selectedColor = tab.data('selcolor'),
          byline = tab.data('byline');
          strokeColor = tab.data('strokecolor');
          onTab = id;

      $('div.jvectormap-label').css('border', '2px solid ' + selectedColor + '');
      $('.toplistings').scrollTop();

          // hacks to handle the bad JSON
          var year = '2016';
          theYear = year;
          var newtype = type.substring(5);
          model.viewModel.year(year);

      tabs.removeClass('selected');
      tab.addClass('selected');
      $('.tabContentMap').removeClass('show-modal');

      $( "div.tabContent .tabContentMap .jvectormap-zoomin, div.tabContent .tabContentMap .jvectormap-zoomout").css('color', sectionColor);

      //change the color on the list items
      $('.tabContentOther .toplistings ul li svg path').css('fill', sectionColor);
      $('.tabContentOther .toplistings ul li svg text').attr('y', 19);
      $('.listingHeader').css('background',sectionColor);
      model.viewModel.type(newtype);
      model.viewModel.id(id);
      model.viewModel.byline(byline);
      model.viewModel.year(year);
      model.viewModel.color = sectionColor;
      model.viewModel.strokeColor = strokeColor;
      model.viewModel.selectedColor(selectedColor);
      filterLocations(type, '');
      $('.ui-slider-handle').css('background-color', model.viewModel.color);

      //need to reset the map to be back at the US view.
      var mapObject = $('.map').vectorMap('get', 'mapObject');
      mapObject.setScale(0);
      $(".toplistings").scrollTop(0);

      //SiteCatalyst Tag
      trackCustom_scLV(tab.find("div").html());

      // Destroy selectBox...
      $('.year-selector').selectBox('destroy');

      // ...and reenable selectBox if Top Cities is selected
      if(id == 'topCity') {

        if( $('body').hasClass('is-mobile') ) {
          yearSelector(theYear);
          $('.selected-year').html(theYear);
          $('a.next-year').addClass(newYear);
        } else {
          $('.year-selector').selectBox({'enable':true,'value':2016});
          $('.selectBox-label').text('2016');
        }

        $('.topCities.section, .toplistings .blocker').hide();
        $('.legendContainer, .density.section, .rainSnow.section, .toplistings .clearfix').show();
        $('.toplistings ul li').removeClass();

      } else if (id == 'density'){

        $('.topCities.section, .rainSnow.section, .toplistings .blocker').show();
        $('.density.section, .legendContainer').hide();
        $('.toplistings ul li').removeClass().addClass('density-icon');
        if( !$('body').hasClass('is-mobile') ) $('.toplistings .clearfix').hide();

      } else if (id == 'rainSnow') {

        $('.topCities.section, .density.section, .toplistings .blocker').show();
        $('.rainSnow.section, .legendContainer').hide();
        $('.toplistings ul li').removeClass().addClass('rainsnow-icon');
        if( !$('body').hasClass('is-mobile') ) $('.toplistings .clearfix').hide();

      }

      if($('body').hasClass('is-mobile')) makeSmaller();

      // reset mobile list
      resetList();
    });

     // Close the modal
    $( ".modalContainer .close" ).on('click', function(e) {
        closeModal(e);
    });

    $('.ui-blocker').not().on('click', function(e) {
        closeModal(e);
    });

    function closeModal(e) {
        var index =  $('.panned-to').data('index');
        var currentClasses = $('.panned-to').siblings('circle').attr("class");

       $('.toplistings ul li.active').removeClass('active');
       $('.tabContentMap').removeClass('show-modal');

       var markerColor;

       if(model.viewModel.currentActiveLocation().New && theYear == '2016') {
         markerColor = newLocationColor;;
       } else if(model.viewModel.currentActiveLocation().Improved && theYear == '2016') {
         markerColor = mostImprovedColor;
       } else {
         markerColor = model.viewModel.color;
       }

       $('.panned-to').attr("class", currentClasses).css({'fill':markerColor, 'stroke':markerColor});

        // Remove City Label
       $('[old-style]').each(function (index) {
           var styles = $(this).attr("old-style");
           $(this).attr("style", styles);
           $(this).removeAttr("old-style");

           // Remove Label Background
           var rect = $(this).prev();
           if (rect) {
               if (rect[0].nodeName === "rect") { // Make sure we are acting on the rectangle
                   rect.attr("height", "0");
               }
           }
       });

       e.stopPropagation();
    }

    function addZoomBar() {
      var html = '<div class="zoom-bar-wrapper"><div id="zoom-bar"><div class="zoom-tick"></div><div class="zoom-tick"></div><div class="zoom-tick"></div><div class="zoom-tick"></div><div class="zoom-ball"></div></div></div>';
      $('.tabContentMap').prepend(html);
       $("#zoom-bar").slider({
        value: 1,
        min: 1,
        max: 4,
        step: 1,
        orientation:'vertical',
        slide: function( event, ui ) {
          var mapObj = $('.map').vectorMap('get', 'mapObject');
          var rounded = Math.round(ui.value);
          if (ui.value == 1) {
            rounded = 0;
          }
          else if (ui.value == 2) {
            rounded = 2;
          }
          else if (ui.value == 3) {
            rounded = 4;
          }
          else if (ui.value == 4) {
            rounded = 8;
          }
          // console.log('this '+ui.value)
          mapObj.setFocus(rounded,0.5,0.5);
          closeModal(event);
        }
      });
    };

    $('.map svg').find('circle').attr('data-index',173).remove();
    $('.jvectormap-container svg').prepend();

    $('.year-selector-mobile a').on('click', function(e){
      e.preventDefault();

      if( $(this).hasClass(prevYear) ) {

        if( $(this).hasClass(oldYear) ) return false;

        if(theYear > 2007){

          theYear--;
          yearSelector(theYear);
          $('.'+nextYear).removeClass(newYear);
          $('.selected-year').html(theYear);

          if(theYear == 2007) {
            $(this).addClass(oldYear);
          }

        }

      } else if( $(this).hasClass(nextYear) ) {

        if( $(this).hasClass(newYear)) return false;

        if(theYear < 2016){

          theYear++;
          yearSelector(theYear);
          $('.'+prevYear).removeClass(oldYear);
          $('.selected-year').html(theYear);

          if(theYear == 2016) {
            $(this).addClass(newYear);
          }

        }

      }

      if(theYear < 2016) {
        $('#density, #rainSnow').addClass('inactive');
      } else {
        $('#density, #rainSnow').removeClass('inactive');
      }

      // reset mobile list
      resetList();
      if($(window).width()<=767) makeSmaller();

    });

    var cur = 0;
    $('.previous-next-items a').on('click', function(e){
      e.preventDefault();
      var max = Math.floor($('.mobile-wrap ul li').length/7);
      makeSmaller();
      if( $(this).hasClass('previous-item') ){

        if( $(this).hasClass('oldest-item') ) return false;
        $('.mobile-wrap ul').animate({'margin-top':'+=322px'}, 'slow');
        $('.previous-next-items a').removeClass('newest-item');
        cur--;
        if(cur==0) $(this).addClass('oldest-item');

      } else if( $(this).hasClass('next-item') ){

        if( $(this).hasClass('newest-item') ) return false;
        $('.mobile-wrap ul').animate({'margin-top':'-=322px'}, 'slow');
        $('.previous-next-items a').removeClass('oldest-item');
        cur++;
        if(cur>=max) $(this).addClass('newest-item');

      }
    });

}); //END DOCUMENT READY

$(window).on('load',function() {

  var ww;
  function wwResize(){

    ww = $(window).width();

    if(ww < 980) {

      // if TABLET
      $('.year-selector').selectBox('destroy');
      $('.toplistings ul li.active').removeClass('active');
      $('.tabContentMap').removeClass('show-modal');

    } else {
      $('.year-selector').selectBox({'enable':true,'value':theYear});
    }

    if(ww <= 767) {

      // if MOBILE
      makeSmaller();
      $('.tabContentOther .toplistings ul li svg').attr('d', 'm0,15c0,-8.28728 6.71271,-15 15,-15c8.28728,0 15,6.71271 15,15c0,8.28728 -6.71272,15 -15,15c-8.28728,0 -15,-6.71272 -15,-15z');

      $('body').addClass('is-mobile');
      $(".toplistings").scrollTop(0);
      $('.toplistings .clearfix').show();
      if(onTab !== 'topCity') $('.toplistings .blocker').show();
      $('.year-selector, #ui-id-1').css('display','inline-block');

    } else {

      $('.tabContentOther .toplistings ul li svg text').attr({'x':14.4,'y':19});
      $('.tabContentOther .toplistings ul li svg text').css('font-size','12px');
      $('.tabContentOther .toplistings ul li svg path').attr('d', 'M28.898,16.164c0,7.659-13.867,24.65-13.867,24.65S1.167,23.822,1.167,16.164c0-7.658,6.208-13.866,13.864-13.866C22.689,2.298,28.898,8.505,28.898,16.164z');

      $('.year-selector').val(theYear);
      $('body').removeClass('is-mobile');
      $('.mobile-wrap ul').css('margin-top',0);
      if(onTab !== 'topCity') $('.toplistings .clearfix').hide();

    }

  } wwResize();

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var resizeCarousel = debounce(function() {
    wwResize();
  }, 50);
  window.addEventListener('resize', resizeCarousel);
});

function makeSmaller(){
  $('.mobile-wrap svg text').css('font-size','20px');
  $('.mobile-wrap svg text').attr({'x':12, 'y':24});
}
