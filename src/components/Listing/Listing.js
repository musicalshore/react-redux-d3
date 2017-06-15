import $ from 'jquery'
import _ from 'lodash/fp'
import React from 'react'
import {MAPS} from 'constants/maps'
import {string, func, number, array, object} from 'prop-types'
import './style.scss'
import prevBlue from './prev_blue.svg'
import nextBlue from './next_blue.svg'
import prevGray from './prev_gray.svg'
import nextGray from './next_gray.svg'

const debounceEventHandler = (fn) => {
  const debounced = _.debounce(300, fn)
  return (e) => {
    e.preventDefault()
    return debounced(e)
  }
}
const ListItem = class ListItem extends React.Component {
  static propTypes = {
    rank: number.isRequired,
    location: object.isRequired,
    onClick: func.isRequired,
    selectedMap: string.isRequired
  }

  render () {
    const {selectedMap, onClick, location, rank} = this.props
    const onClickListItem = (e) => {
      e.preventDefault()
      onClick()
    }
    return (
      <li onClick={onClickListItem} styleName={_.kebabCase(selectedMap)}>
        <svg viewBox="0 0 30 30">
          <g>
            <circle cx="15" cy="15" r="15" />
            <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{rank}</text>
          </g>
        </svg>
        <div styleName="cityState"><a href="#" onClick={onClickListItem}>{location.cityState}</a></div>
      </li>
    )
  }
}

const Listing = class Listing extends React.Component {
  static propTypes = {
    selectedMap: string.isRequired,
    onCitySelect: func.isRequired,
    locations: array,
    selectedCity: string
  }

  state = {
    scrollTop: 0,
    currentPage: 1,
    numberOfPages: 0
  }

  scrollAhead = debounceEventHandler(() => {
    let {currentPage, numberOfPages} = this.state
    if (currentPage < numberOfPages) {
      const scrollTop = this.listing.scrollTop + this.listing.clientHeight
      $(this.listing).animate({scrollTop: scrollTop}, 400)
      this.setState({scrollTop, currentPage: ++currentPage})
    }
  })
  scrollBack = debounceEventHandler(() => {
    let {currentPage} = this.state
    if (currentPage > 1) {
      const scrollTop = this.listing.scrollTop - this.listing.clientHeight
      $(this.listing).animate({scrollTop: scrollTop}, 400)
      this.setState({scrollTop, currentPage: --currentPage})
    }
  })

  componentDidMount () {
    const count = this.props.locations.length
    const numberOfPages = Math.floor(count / 7) + 1
    if (numberOfPages > 1) {
      $(this.next).css({'color': '#666', 'font-weight': 600})
    }
    this.setState({numberOfPages})
  }

  render () {
    const {selectedMap, locations, onCitySelect} = this.props
    const rankingType = _.get('rankingType', _.find(['id', selectedMap], MAPS))
    let {currentPage, numberOfPages} = this.state

    if (_.isEmpty(locations)) {
      return null
    }

    const listItems = _.map(location => {
      const rank = _.get(`rankings.${rankingType}`, location)
      return (
        <ListItem key={rank}
          rank={rank}
          selectedMap={selectedMap}
          location={location}
          onClick={() => {
            window.lastFocus = document.activeElement
            onCitySelect(location.cityState)
          }}
        />
      )
    }, _.sortBy(_.get(`rankings.${rankingType}`), locations))

    return (
      <div styleName="container" ref={el => { this.container = el } }>
        <div styleName="instructions">
          Select city for more data.
        </div>
        <ol styleName="list-container" ref={el => { this.listing = el } }>
          {listItems}
        </ol>
        <nav role="navigation" aria-label="Pagination Navigation">
          <ol styleName="scroller-container">
            <li styleName="previous">
              {currentPage > 1 &&
                <a href="#" onClick={this.scrollBack}>
                  <img src={prevBlue} alt="previous" />
                </a>
              }
              {currentPage === 1 &&
                  <img src={prevGray} />
              }
            </li>
            <li styleName="next">
              {currentPage < numberOfPages &&
                <a href="#" onClick={this.scrollAhead}>
                  <img src={nextBlue} alt="next" />
                </a>
              }
              {currentPage >= numberOfPages &&
                  <img src={nextGray} />
              }
            </li>
          </ol>
        </nav>
      </div>
    )
  }
}

export default Listing
