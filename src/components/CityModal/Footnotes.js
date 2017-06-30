import React from 'react'
import {object} from 'prop-types'
import SocialShare from 'components/SocialShare'

const Footnotes = ({location, selectedMap}) => {
  return (
    <div className="footnotes-container">
      <div className="footnotes">
        <div tabIndex="0"><sup>1</sup> National average: 10</div>
        <div tabIndex="0"><sup>2</sup> National average: 19</div>
      </div>
      <div className="social-share-button">
        <SocialShare location={location} selectedMap={selectedMap} />
      </div>
    </div>
  )
}
Footnotes.propTypes = {
  location: object.isRequired
}
export default Footnotes
