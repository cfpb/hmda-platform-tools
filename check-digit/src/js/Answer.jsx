import React, { Component } from 'react'
import PropTypes from 'prop-types'

const getText = answer => {
  let text = 'Your answer will show up here.'
  if (answer) {
    text = `Your check digit is ${answer}.`
  }

  return text
}

const Answer = ({ answer }) => {
  return <p>{getText(answer)}</p>
}

Answer.propTypes = {
  answer: PropTypes.string
}

export default Answer
