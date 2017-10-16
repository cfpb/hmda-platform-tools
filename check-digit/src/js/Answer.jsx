import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const Answer = ({ answer }) => {
  if (answer)
    return (
      <Alert type="success" heading="Check digit calculated!">
        <p>
          Your check digit is <strong>{answer}</strong>.
        </p>
      </Alert>
    )

  return null
}

Answer.propTypes = {
  answer: PropTypes.string
}

export default Answer
