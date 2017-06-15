import bestDriverData from 'data/best-driver-2017.json'
import {mapLocationData} from 'utils/utils'
import {YEARS} from 'constants/maps'

const BEST_DRIVER_DATA = mapLocationData(YEARS, bestDriverData)

export default BEST_DRIVER_DATA
