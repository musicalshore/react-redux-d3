import {string, object} from 'prop-types'
import React from 'react'
import {Ordinal} from 'utils/utils'
import {DEFAULT_MAP, DEFAULT_YEAR, MAPS} from 'constants/maps'

const Rankings = class Rankings extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    location: object.isRequired,
    selectedYear: string.isRequired
  }
  render () {
    const {location, selectedMap, selectedYear} = this.props
    const topCities = location.rankings[`Top Cities`]
    const previousTopCities = location.rankings[`Previous Top Cities`]
    const populationDensity = location.rankings[`Population Density`]
    const rainSnow = location.rankings[`Rain & Snow`]
    let arrow = ''
    if (previousTopCities) {
      if (topCities < previousTopCities) {
        arrow += 'arrow up'
      } else if (topCities > previousTopCities) {
        arrow += 'arrow down'
      }
    }

    return (
      <div className="rankings-container">
        <h5>{selectedYear} data</h5>
        <div className="overall-ranking">
          <span>Overall Ranking</span>
          <span className={arrow} />
          <span className="rank">
            <Ordinal number={topCities} sup={true} />
          </span>
        </div>
        {populationDensity &&
          <div className="population-ranking"><span>Population Density</span><span className="rank"><Ordinal number={populationDensity} sup={true} /></span></div>
        }
        {rainSnow &&
          <div className="rain-snow-ranking"><span>Rain & Snow</span><span className="rank"><Ordinal number={rainSnow} sup={true} /></span></div>
        }
        {previousTopCities &&
          <div className="last-years-ranking"><span>{parseInt(selectedYear) - 1} Ranking</span><span className="rank"><Ordinal number={previousTopCities} sup={true} /></span></div>
        }
      </div>
    )
  }
}

export default Rankings
