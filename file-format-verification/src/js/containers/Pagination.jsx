import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import paginationFadeIn from '../actions/paginationFadeIn.js'
import paginationFadeOut from '../actions/paginationFadeOut.js'
import setPage from '../actions/setPage.js'
import Pagination from '../components/Pagination.jsx'

class PaginationContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Pagination {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { parseErrors } = state.app

  return {
    parseErrors
  }
}

function fadeAndSet(dispatch, page) {
  const fadeIn = () => {
    return dispatch(paginationFadeIn())
  }

  setTimeout(fadeIn, 300)
  dispatch(paginationFadeOut())
  dispatch(setPage(page))
}

function mapDispatchToProps(dispatch) {
  return {
    getPage: page => {
      if (page === undefined) return
      fadeAndSet(dispatch, page)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer)
export { PaginationContainer, mapStateToProps, mapDispatchToProps }
