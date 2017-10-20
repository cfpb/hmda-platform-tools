import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const InputError = ({ isSubmitted, errors }) => {
  if (isSubmitted && errors.length > 0) {
    return (
      <Alert type="error" heading="Sorry!">
        <ul>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ul>
      </Alert>
    )
  }

  return null
}

InputError.propTypes = {
  answer: PropTypes.string,
  isSubmitted: PropTypes.bool
}

export default InputError
