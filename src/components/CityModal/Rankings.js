import React from 'react'
import PropTypes from 'prop-types'
import {ordinal} from 'utils'

const Rankings = (props) => {
  let {selectedCity, selectedMap} = props
  // console.log('______selectedCity',selectedCity, selectedMap);
  const populationDensity = selectedCity[`${selectedMap.year} Population Density`]
  const rainSnow = selectedCity[`${selectedMap.year} Rain & Snow`]
  const lastYearsRanking = selectedCity[`${parseInt(selectedMap.year) - 1} Top Cities`]
  let arrow = 'arrow'
  if (selectedCity.rank < lastYearsRanking) {
    arrow += ' up'
  } else if (selectedCity.rank > lastYearsRanking) {
    arrow += ' down'
  }
  return (
    <div className="rankings-container">
      <h5>{selectedMap.year} data</h5>
      <div className="overall-ranking">
        <span>Overall Ranking</span>
        <span className={arrow} /><span className="rank">{ordinal(selectedCity.rank, true)}</span></div>
      {populationDensity &&
        <div className="population-ranking"><span>Population Density</span><span className="rank">{ordinal(populationDensity, true)}</span></div>
      }
      {rainSnow &&
        <div className="rain-snow-ranking"><span>Rain & Snow</span><span className="rank">{ordinal(rainSnow, true)}</span></div>
      }
      {lastYearsRanking &&
        <div className="last-years-ranking"><span>{parseInt(selectedMap.year) - 1} Ranking</span><span className="rank">{ordinal(lastYearsRanking, true)}</span></div>
      }
    </div>
  )
}


Rankings.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  selectedCity: PropTypes.object.isRequired
}

export default Rankings
