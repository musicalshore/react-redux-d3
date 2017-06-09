import $ from 'jquery'
import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
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
const ListItem = ({rank, cityState, onClick, selectedMap}) => {
  const onClickListItem = (e) => {
    console.log('e', e)
    e.preventDefault()
    onClick()
  }
  return (
    <li onClick={onClickListItem} styleName={_.kebabCase(selectedMap.id)}>
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g>
          <circle cx="15" cy="15" r="15" />
          <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{rank}</text>
        </g>
      </svg>
      <div styleName="cityState"><a href="#" onClick={onClickListItem}>{cityState}</a></div>
    </li>
  )
}

const Listing = class Listing extends React.Component {
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
    const count = this.props.selectedMap.mapData.locations.length
    const numberOfPages = Math.floor(count / 7) + 1
    if (numberOfPages > 1) {
      $(this.next).css({'color': '#666', 'font-weight': 600})
    }
    this.setState({numberOfPages})
  }

  render () {
    let {selectedMap, onCitySelect} = this.props
    let {currentPage, numberOfPages} = this.state
    const locations = _.get('mapData.locations', selectedMap)
    if (!locations) {
      // throw new Error('No locations to render in Listing')
      return null
    }
    const listItems = _.map(ranking => {
      return (
        <ListItem
          key={ranking.rank} {...ranking}
          selectedMap={selectedMap}
          onClick={() => {
            window.lastFocus = document.activeElement
            onCitySelect(ranking)
          }}
        />
      )
    }, _.sortBy('rank', locations))

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

ListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  cityState: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

Listing.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}

export default Listing
