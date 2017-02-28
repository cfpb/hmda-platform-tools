import React, { Component, PropTypes } from 'react'
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

  return {
    isParsing,
    parsed,
    transmittalSheetErrors,
    larErrors
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
