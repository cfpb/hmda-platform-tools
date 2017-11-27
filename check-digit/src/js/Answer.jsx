import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const Answer = ({ uli, isValidUli, checkDigit, isSubmitted, errors }) => {
  if (isSubmitted && errors.length === 0) {
    if (uli && checkDigit)
      return (
        <Alert type="success" heading="Check digit calculated!">
          <p>
            Your check digit is <strong>{checkDigit}</strong>.<br />
            Your ULI is <strong>{uli}</strong>.
          </p>
        </Alert>
      )

    if (isValidUli) {
      return (
        <Alert type="success" heading="Check digit valid!">
          <p>The check digit and ULI are valid.</p>
        </Alert>
      )
    } else {
      return (
        <Alert type="error" heading="Not a valid check digit!">
          <p>Sorry, that check digit and ULI do not appear to be valid.</p>
        </Alert>
      )
    }
  }

  return null
}

Answer.propTypes = {
  uli: PropTypes.string,
  isValidUli: PropTypes.bool,
  checkDigit: PropTypes.string,
  isSubmitted: PropTypes.bool,
  errors: PropTypes.array
}

export default Answer
