import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i style={{color}} className={value >= 1 ? 'fas fa-circle' : value >= 0.5 ? 'far fa-dot-circle' : 'far fa-circle'}></i>
      </span>
      <span>
        <i style={{color}} className={value >= 2 ? 'fas fa-circle' : value >= 1.5 ? 'far fa-dot-circle' : 'far fa-circle'}></i>
      </span>
      <span>
        <i style={{color}} className={value >= 3 ? 'fas fa-circle' : value >= 2.5 ? 'far fa-dot-circle' : 'far fa-circle'}></i>
      </span>
      <span>
        <i style={{color}} className={value >= 4 ? 'fas fa-circle' : value >= 3.5 ? 'far fa-dot-circle' : 'far fa-circle'}></i>
      </span>
      <span>
        <i style={{color}} className={value >= 5 ? 'fas fa-circle' : value >= 4.5 ? 'far fa-dot-circle' : 'far fa-circle'}></i>
      </span>
      <span>
        <span>{text && text}</span>
      </span>
    </div>
  )
}

// default values for props that were not passed in
Rating.defaultProps = {
  color: '#f8e823'
}

// strict typing incoming props
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Rating;