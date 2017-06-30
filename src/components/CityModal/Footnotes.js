import React from 'react'
import {object, string} from 'prop-types'
import {DEFAULT_YEAR} from 'constants/maps'
import SocialShare from 'components/SocialShare'

const Footnotes = ({location, selectedMap, selectedYear}) => {
  return (
    <div className="footnotes-container">
      <div className="footnotes">
        <div tabIndex="0"><sup>1</sup> National average: 10</div>
        <div tabIndex="0"><sup>2</sup> National average: 19</div>
      </div>
      <If condition={selectedYear === DEFAULT_YEAR}>
        <div className="social-share-button">
          <SocialShare location={location} selectedMap={selectedMap} />
        </div>
      </If>
    </div>
  )
}
Footnotes.propTypes = {
  location: object.isRequired,
  selectedMap: string.isRequired,
  selectedYear: string.isRequired
}
export default Footnotes
