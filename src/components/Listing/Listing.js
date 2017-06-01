import $ from 'jquery'
import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ListItem = ({rank, cityState, onClick, selectedMap}) => {
  return (
    <li onClick={onClick} styleName={_.kebabCase(selectedMap.id)}>
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g>
          <circle cx="15" cy="15" r="15" />
          <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle">{rank}</text>
        </g>
      </svg>
      <div styleName="cityState"><a href="#" onClick={e => {
        e.preventDefault()
        onClick()
      }}>{cityState}</a></div>
    </li>
  )
}

const Listing = class Listing extends React.Component {
  constructor () {
    super()
    this.scrollAhead = this.scrollAhead.bind(this)
    this.scrollBack = this.scrollBack.bind(this)
    // this.listElements = []
    this.state = {
      scrollTop: 0,
      currentPage: 1,
      numberOfPages: 0
    }
  }

  scrollAhead (e) {
    let {currentPage, numberOfPages} = this.state
    if (currentPage < numberOfPages) {
      const scrollTop = this.listing.scrollTop + this.listing.clientHeight
      $(this.listing).animate({scrollTop: scrollTop}, 400)
      if (++currentPage === numberOfPages) {
        $(this.next).css({'color': '#bcbcbc', 'font-weight': 100})
      }
      $(this.previous).css({'color': '#666', 'font-weight': 600})
      this.setState({scrollTop, currentPage})
    }
    e.preventDefault()
  }
  scrollBack (e) {
    let {currentPage} = this.state
    if (currentPage > 1) {
      const scrollTop = this.listing.scrollTop - this.listing.clientHeight
      $(this.listing).animate({scrollTop: scrollTop}, 400)
      if (--currentPage === 1) {
        $(this.previous).css({'color': '#bcbcbc', 'font-weight': 100})
        $(this.next).css({'color': '#666', 'font-weight': 600})
      }
      this.setState({scrollTop, currentPage})
    }
    e.preventDefault()
  }

  componentDidMount () {
    const count = this.props.selectedMap.mapData.markers.length
    const numberOfPages = Math.floor(count / 7) + 1
    if (numberOfPages > 1) {
      $(this.next).css({'color': '#666', 'font-weight': 600})
    }
    this.setState({numberOfPages})
  }

  render () {
    let {selectedMap, onCitySelect} = this.props
    const markers = _.get('mapData.markers', selectedMap)
    if (!markers) {
      return null
    }
    const listItems = _.map(ranking => {
      return (
        <ListItem
          key={ranking.rank} {...ranking} selectedMap={selectedMap} onClick={() => onCitySelect(ranking)}
        />
      )
    }, _.sortBy('rank', markers))

    return (
      <div styleName="container" ref={el => { this.container = el } }>
        <div styleName="instructions">
          Select city for more data.
        </div>
        <ol styleName="list-container" ref={el => { this.listing = el } }>
          {listItems}
        </ol>
        <ol styleName="scroller-container">
          <li styleName="previous">
            <i className="fa fa-angle-left fa-lg"></i>
            <a href="#" onClick={this.scrollBack} ref={el => { this.previous = el } }>Prev</a>
          </li>
          <li styleName="next">
            <a href="#" onClick={this.scrollAhead} ref={el => { this.next = el } }>Next</a>
            <i className="fa fa-angle-right fa-lg"></i>
          </li>
        </ol>
      </div>
    )
  }
}

ListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  cityState: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

Listing.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}

export default Listing
