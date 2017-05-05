export const SELECT_MAP = 'SELECT_MAP'
export const SELECT_YEAR = 'SELECT_YEAR'

const vectorMap = {
  map: 'us_aea_en',
  backgroundColor: '#fff',
  zoomStep: 2,
  zoomOnScroll: false,
  regionStyle: {
    initial: {
      fill: '#e8e8e8'
    },
    hover: {
      fill: '#666'
    }
  },
  markerStyle: {
    initial: {
      stroke: '#fff'
    },
    selected: {
      r: 16,
      fill: '#0096d6'
    }
  },
  markers: [],
  regionsSelectable: false,
  markersSelectable: false,
  markersSelectableOne: false
}
const topCity = Object.assign({}, vectorMap, {id: 'top-city', type: 'Top Cities'})
const density = Object.assign({}, vectorMap, {id: 'density', type: 'Population Density'})
const rainSnow = Object.assign({}, vectorMap, {id: 'rain-snow', type: 'Rain & Snow'})

export const VectorMaps = {
  topCity: topCity,
  density: density,
  rainSnow: rainSnow
}

export const selectMap = (selectedMap) => ({
  type: SELECT_MAP,
  selectedMap
})

export const selectYear = (selectedYear) => ({
  type: SELECT_YEAR,
  selectedYear
})
