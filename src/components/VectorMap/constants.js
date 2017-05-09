const VECTOR_MAP = {
  map: 'us_aea_en',
  backgroundColor: '#fff',
  zoomStep: 2,
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#e8e8e8'
    },
    hover: {
      'fill-opacity': 1
    }
  },
  regionLabelStyle: {
    initial: {
      display: 'none'
    },
    hover: {
      display: 'none'
    }
  },
  onRegionTipShow: function (e) {
    e.preventDefault()
    // console.log('onMarkerTipShow', arguments)
  },
  markerStyle: {
    initial: {
      stroke: defaultStroke,
      fill: defaultFill
    },
    selected: {
      r: 16,
      fill: '#0096d6'
    }
  },
  markerLabelStyle: {
    initial: {
      display: 'none'
    },
    hover: {
      display: 'visible'
    }
  },
  markers: [],
  series: {},
  regionsSelectable: false,
  markersSelectable: false,
  markersSelectableOne: false,
  onMarkerTipShow: function (e) {
    e.preventDefault()
    // console.log('onMarkerTipShow', arguments)
  }
}
