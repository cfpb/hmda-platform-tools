import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIcon from '../components/LoadingIcon.jsx'

let scrollHeight
let scrollDiff

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '1' }
    this._change = this._change.bind(this)
    this._submit = this._submit.bind(this)
    this._setFromProps = this._setFromProps.bind(this)
  }

  _change(e) {
    this.setState({ value: e.target.value })
  }

  _setScrollValues() {
    scrollHeight = document.body.scrollHeight
    scrollDiff = scrollHeight - window.scrollY
  }

  _setFromProps() {
    const val = this._getCurrentPage()
    if (val === null) return
    if (this.state.value !== val) this.setState({ value: val })
  }

  _submit(e) {
    e.preventDefault()

    this._setScrollValues()

    let val = parseInt(this.state.value, 10)
    const last = this._getLastPage(this.props)

    if (isNaN(val)) return this._setFromProps()

    if (val < 1) val = 1
    if (val > last) val = last

    this.props.getPage(val)
  }

  _getCurrentPage() {
    return this.props.pagination.page
  }

  _getLastPage() {
    return this.props.pagination.last
  }

  _getInput() {
    return (
      <form onSubmit={this._submit}>
        <label htmlFor="ParseErrorPagination">Lar Errors</label>
        <input
          id="ParseErrorPagination"
          type="text"
          value={this.state.value}
          onBlur={this._setFromProps}
          onChange={this._change}
        />
      </form>
    )
  }

  componentWillMount() {
    this._setFromProps()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pagination || nextProps.isFetching) return
    this.setState({ value: this._getPaginationValue(nextProps) })
  }

  componentDidUpdate(prevProps, prevState) {
    const currentScroll = document.body.scrollHeight
    if (
      this.state.value !== prevState.value &&
      currentScroll !== scrollHeight
    ) {
      window.scrollTo(0, currentScroll - scrollDiff)
      scrollHeight = currentScroll
    }
  }

  render() {
    const pagination = this.props.pagination
    const page = this._getCurrentPage()
    // we've decided that 20 is the default for pagination
    if (pagination.total < 21) return null
    const firstPage = page === 1
    const lastPage = page === pagination.last

    return (
      <div className="PaginationControls">
        <button
          className={firstPage ? 'usa-button-disabled' : ''}
          onClick={e => {
            if (!firstPage) {
              this._setScrollValues()
              this.props.getPage(page - 1)
            }
          }}
        >
          Previous
        </button>
        <div>
          Page {this._getInput()} of {Math.ceil(pagination.total / 20)}
        </div>
        <button
          className={lastPage ? 'usa-button-disabled' : ''}
          onClick={e => {
            if (!lastPage) {
              this._setScrollValues()
              this.props.getPage(page + 1)
            }
          }}
        >
          Next
        </button>
        {this.props.isFetching ? <LoadingIcon /> : null}
      </div>
    )
  }
}

Pagination.propTypes = {
  isFetching: PropTypes.bool,
  pagination: PropTypes.object,
  getPage: PropTypes.func
}

export default Pagination
