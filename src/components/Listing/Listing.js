import _ from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'
import './style.scss'

const Events = Scroll.Events
const scroll = Scroll.animateScroll
const scrollSpy = Scroll.scrollSpy
const scroller = Scroll.scroller
// const PagedListing = class PagedListing extends React.Component {

//   constructor () {
//     super()
//   }

// }

const ListItem = ({rank, cityState, onClick, name, selectedMap}) => {
  return (
    <li name={name} onClick={onClick} styleName={_.kebabCase(selectedMap.id)}>
      <svg width="30" height="30">
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

let maxPosition = 0
const Listing = class Listing extends React.Component {
  constructor () {
    super()
    this.scrollAhead = this.scrollAhead.bind(this)
    this.scrollBack = this.scrollBack.bind(this)
    // this.scrollToBottom = this.scrollToBottom.bind(this)
    this.state = {currentPosition: 0, maxPosition: maxPosition}
    this.listElements = []
  }
  // const rankingsByYearAndType = _.filter(ranking => !!ranking.rank, _.sortBy('rank', selectedMap.mapData.markers))
  // console.log('rankingsByYearAndType ', rankingsByYearAndType)
  // const rankingsByYearName = selectedMap.mapData.markers
  // const filteredRankings = _.filter(ranking => !!ranking.rank, rankingsByYearAndType)

  scrollAhead () {
    // const next = `position-${this.state.currentPosition + 1}`
    let candidate = this.state.currentPosition + 7
    let next = candidate < this.state.maxPosition ? candidate : this.state.maxPosition
    let name = `position-${next}`
    console.log('listElements', this.listElements)
    console.log('next ', name)
    scroller.scrollTo(name, {
      containerId: 'scrollableListContainer'
    })

    this.setState = {currentPosition: next}
    // if (this.state.currentPosition < this.state.maxPosition) {

    //   // listElements[next].scrollIntoView(true)
    //   // var elmnt = document.getElementById("content");

    // }
  }
  scrollBack () {
    const previous = `position-${this.state.currentPosition - 1}`
    console.log('previous ', previous)
    if (this.state.currentPosition > 1) {
      scroller.scrollTo(`position-${this.state.currentPosition - 1}`, {
        containerId: 'scrollableListContainer'
      })
      this.setState = {currentPosition: this.state.currentPosition - 1}
    }
  }
  // scrollToBottom () {
  //   scroller.scrollToBottom()
  // }
  componentDidMount () {
    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', arguments)
    })

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', arguments)
    })

    scrollSpy.update()
    this.setState({maxPosition})
  }
  render () {
    let {selectedMap, onCitySelect, selectedCity} = this.props
    console.log("selectedMap ", selectedMap);
    // const sortedMarkers = _.sortBy('rank', selectedMap.mapData.markers)
    // let sections = []
    // for (let i = 0; i < selectedMap.mapData.markers.length; i = i + 7) {
    //   let section = _.slice(i, i + 7, sortedMarkers)
    //   const listItems = _.map(ranking => <ListItem key={ranking.rank} {...ranking} onClick={() => onCitySelect(ranking)} />, section)
    //   sections.push(<ul>{listItems}</ul>)
    // }
    const listItems = _.map(ranking => {
      return (
        <ListItem
          ref={item => { this.listElements.push(item) } }
          name={`position-${maxPosition++}`}
          key={ranking.rank} {...ranking} selectedMap={selectedMap} onClick={() => onCitySelect(ranking)}
        />
      )
    }, _.sortBy('rank', selectedMap.mapData.markers))

    return (
      <div id="scrollableListContainer" styleName="container">
        <div styleName="instructions">
          Select city for more data.
        </div>
        <div styleName="paging">
          <ul >
            {listItems}
          </ul>
        </div>
          {/*<a styleName="previous" onClick={this.scrollBack}>Previous</a>
          <a styleName="next" onClick={this.scrollAhead}>Next</a>*/}
      </div>
    )
  }
}

ListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  cityState: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMap: PropTypes.object.isRequired
}

Listing.propTypes = {
  selectedMap: PropTypes.object.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}

export default Listing
