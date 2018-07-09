import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FilingPeriodSelector } from 'hmda-ui'
import { setFilingPeriod } from '../actions'

class FilingPeriodSelectorContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <FilingPeriodSelector {...this.props} />
  }
}

function mapStateToProps(state) {
  const filingPeriod = state.app.filingPeriod

  return {
    filingPeriod
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: e => {
      dispatch(setFilingPeriod(e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FilingPeriodSelectorContainer
)
