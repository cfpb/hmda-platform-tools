import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ParseErrors from '../components/ParseErrors.jsx'

class ParseErrorsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <ParseErrors {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    isParsing,
    parsed,
    transmittalSheetErrors,
    larErrors
  } = state.app.parseErrors

  const { page } = state.app.pagination

  return {
    isParsing,
    parsed,
    transmittalSheetErrors,
    larErrors,
    page
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
