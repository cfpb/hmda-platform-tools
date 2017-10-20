import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const Answer = ({ uli, isValidUli, checkDigit, isSubmitted }) => {
  if (isSubmitted) {
    if (uli && checkDigit)
      return (
        <Alert type="success" heading="Check digit calculated!">
          <p>
            Your check digit is <strong>{checkDigit}</strong>.<br />
            Your ULI is <strong>{uli}</strong>.
          </p>
        </Alert>
      )

    if (isValidUli)
      return (
        <Alert type="success" heading="Check digit valid!">
          <p>The check digit and ULI are valid.</p>
        </Alert>
      )
  }

  return null
}

Answer.propTypes = {
  uli: PropTypes.string,
  checkDigit: PropTypes.string,
  isSubmitted: PropTypes.bool
}

export default Answer
