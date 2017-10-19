import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const Answer = ({ uli, checkDigit, isSubmitted }) => {
  if (uli && checkDigit && isSubmitted)
    return (
      <Alert type="success" heading="Check digit calculated!">
        <p>
          Your check digit is <strong>{checkDigit}</strong>.<br />
          Your ULI is <strong>{uli}</strong>.
        </p>
      </Alert>
    )

  return null
}

Answer.propTypes = {
  uli: PropTypes.string,
  checkDigit: PropTypes.string,
  isSubmitted: PropTypes.bool
}

export default Answer
