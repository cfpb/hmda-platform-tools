import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    this.dataInput.focus()
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value }, () => {
      this.props.onChange()
    })
  }

  handleInputBlur(event) {
    if(this.props.whichApp === 'get') {
      this.props.validateLoanId(this.state.inputValue)
    } else {
      this.props.validateUli(this.state.inputValue)
    }
  }

  handleRadioChange(event) {
    this.props.onRadioChange(event.target.value)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.inputValue)
  }

  getInputLabel(app) {
    if(app === 'get') {
      return 'Enter a loan ID (LEI + loan or application ID)'
    }

    return 'Enter a ULI'
  }

  getSubmitText(app) {
    if(app === 'get') {
      return 'Get the check digit'
    }

    return 'Validate the check digit'
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
        <ul className="usa-unstyled-list">
          <li>
            <input
              id="getCheckDigit"
              type="radio"
              name="whichApp"
              value="get"
              onChange={this.handleRadioChange}
              checked={this.props.whichApp === 'get'}
            />
            <label htmlFor="getCheckDigit">get a check digit</label>
          </li>
          <li>
            <input
              id="validateCheckDigit"
              type="radio"
              name="whichApp"
              value="validate"
              onChange={this.handleRadioChange}
              checked={this.props.whichApp === 'validate'}
            />
            <label htmlFor="validateCheckDigit">validate a check digit</label>
          </li>
        </ul>
        <label htmlFor="dataInput">
          {this.getInputLabel(this.props.whichApp)}
        </label>
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
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
        />
        <input type="submit" value={this.getSubmitText(this.props.whichApp)} />
      </form>
    )
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validateUli: PropTypes.func.isRequired,
  validateLoanId: PropTypes.func.isRequired,
  errors: PropTypes.array,
  onRadioChange: PropTypes.func,
  whichApp: PropTypes.string
}

export default Form
