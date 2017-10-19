import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { loanId: '' }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    this.dataInput.focus()
  }

  handleInputChange(event) {
    this.setState({ loanId: event.target.value }, () => {
      this.props.onChange()
    })
  }

  handleInputBlur(event) {
    this.props.validateLoanId(this.state.loanId)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.loanId)
  }

  render() {
    if (!this.props.onSubmit)
      return (
        <Alert type="error" heading="Uh oh!">
          <p>Something went wrong. Submitting a loan ID won't work.</p>
        </Alert>
      )

    return (
      <form
        className="CheckDigitForm usa-grid"
        id="main-content"
        onSubmit={this.handleFormSubmit}
      >
        <label htmlFor="dataInput">Enter a loan ID (LEI + loan or application ID)</label>
        {this.props.errors.map((error, i) => {
          return (
            <span key={i} className="usa-input-error-message" role="alert">
              {error}
            </span>
          )
        })}
        <input
          id="dataInput"
          ref={input => {
            this.dataInput = input
          }}
          type="text"
          value={this.state.loanId}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
        />
        <input type="submit" value="Get the check digit" />
      </form>
    )
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validateUli: PropTypes.func.isRequired,
  validateLoanId: PropTypes.func.isRequired,
  errors: PropTypes.array
}

export default Form
