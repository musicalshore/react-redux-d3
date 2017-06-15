import _ from 'lodash/fp'
export const TOP_CITY = 'TOP_CITY'
export const DENSITY = 'DENSITY'
export const RAIN_SNOW = 'RAIN_SNOW'

export const MAPS = [
  {
    id: TOP_CITY,
    rankingType: 'Top Cities',
    title: 'Top Cities',
    byline: `Explore which cities are least likely to experience collisions.`
  },
  {
    id: DENSITY,
    rankingType: 'Population Density',
    title: 'Population Density',
    byline: `See how population density impacts driving in your city.`,
    limitYear: '2014'
  },
  {
    id: RAIN_SNOW,
    rankingType: 'Rain & Snow',
    title: 'Rain & Snow',
    byline: `See how precipitation (or lack thereof) impacts your city's ranking.`,
    limitYear: '2014'
  }
]

export const DEFAULT_MAP = TOP_CITY

export const DEFAULT_YEAR = '2017'

export const YEARS = [
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017'
]

export const USA_STATES = [
  {
    name: 'Alabama',
    id: 'AL'
  },
  {
    name: 'Alaska',
    id: 'AK'
  },
  {
    name: 'Arizona',
    id: 'AZ'
  },
  {
    name: 'Arkansas',
    id: 'AR'
  },
  {
    name: 'California',
    id: 'CA'
  },
  {
    name: 'Colorado',
    id: 'CO'
  },
  {
    name: 'Connecticut',
    id: 'CT'
  },
  {
    name: 'Delaware',
    id: 'DE'
  },
  {
    name: 'Washington, D.C.',
    id: 'D.C.'
  },
  {
    name: 'Florida',
    id: 'FL'
  },
  {
    name: 'Georgia',
    id: 'GA'
  },
  {
    name: 'Hawaii',
    id: 'HI'
  },
  {
    name: 'Idaho',
    id: 'ID'
  },
  {
    name: 'Illinois',
    id: 'IL'
  },
  {
    name: 'Indiana',
    id: 'IN'
  },
  {
    name: 'Iowa',
    id: 'IA'
  },
  {
    name: 'Kansas',
    id: 'KS'
  },
  {
    name: 'Kentucky',
    id: 'KY'
  },
  {
    name: 'Louisiana',
    id: 'LA'
  },
  {
    name: 'Maine',
    id: 'ME'
  },
  {
    name: 'Maryland',
    id: 'MD'
  },
  {
    name: 'Massachusetts',
    id: 'MA'
  },
  {
    name: 'Michigan',
    id: 'MI'
  },
  {
    name: 'Minnesota',
    id: 'MN'
  },
  {
    name: 'Mississippi',
    id: 'MS'
  },
  {
    name: 'Missouri',
    id: 'MO'
  },
  {
    name: 'Montana',
    id: 'MT'
  },
  {
    name: 'Nebraska',
    id: 'NE'
  },
  {
    name: 'Nevada',
    id: 'NV'
  },
  {
    name: 'New Hampshire',
    id: 'NH'
  },
  {
    name: 'New Jersey',
    id: 'NJ'
  },
  {
    name: 'New Mexico',
    id: 'NM'
  },
  {
    name: 'New York',
    id: 'NY'
  },
  {
    name: 'North Carolina',
    id: 'NC'
  },
  {
    name: 'North Dakota',
    id: 'ND'
  },
  {
    name: 'Ohio',
    id: 'OH'
  },
  {
    name: 'Oklahoma',
    id: 'OK'
  },
  {
    name: 'Oregon',
    id: 'OR'
  },
  {
    name: 'Pennsylvania',
    id: 'PA'
  },
  {
    name: 'Rhode Island',
    id: 'RI'
  },
  {
    name: 'South Carolina',
    id: 'SC'
  },
  {
    name: 'South Dakota',
    id: 'SD'
  },
  {
    name: 'Tennessee',
    id: 'TN'
  },
  {
    name: 'Texas',
    id: 'TX'
  },
  {
    name: 'Utah',
    id: 'UT'
  },
  {
    name: 'Vermont',
    id: 'VT'
  },
  {
    name: 'Virginia',
    id: 'VA'
  },
  {
    name: 'Washington',
    id: 'WA'
  },
  {
    name: 'West Virginia',
    id: 'WV'
  },
  {
    name: 'Wisconsin',
    id: 'WI'
  },
  {
    name: 'Wyoming',
    id: 'WY'
  }
]
