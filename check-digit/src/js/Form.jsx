import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

class Form extends Component {
  constructor(props) {
    super(props)

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    this.dataInput.focus()
  }

  handleTextChange(event) {
    this.props.onTextChange(event.target.value)
  }

  handleInputBlur(event) {
    this.props.validateInput(this.props.inputValue)
  }

  handleRadioChange(event) {
    this.props.onRadioChange(event.target.value)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.props.inputValue)
  }

  render() {
    if (!this.props.onSubmit)
      return (
        <Alert type="error" heading="Uh oh!">
          <p>Something went wrong. Submitting a loan ID won't work.</p>
        </Alert>
      )

    const { whichApp, errors, inputValue } = this.props

    const labelText = {
      get: 'Enter a loan ID (LEI + loan or application ID)',
      validate: 'Enter a ULI'
    }[whichApp]

    const buttonText = {
      get: 'Get the check digit',
      validate: 'Validate the check digit'
    }[whichApp]

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
              checked={whichApp === 'get'}
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
              checked={whichApp === 'validate'}
            />
            <label htmlFor="validateCheckDigit">validate a check digit</label>
          </li>
        </ul>
        <label htmlFor="dataInput">{labelText}</label>
        {errors.map((error, i) => {
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
          value={inputValue}
          onChange={this.handleTextChange}
          onBlur={this.handleInputBlur}
        />
        <input type="submit" value={buttonText} />
      </form>
    )
  }
}

Form.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validateInput: PropTypes.func.isRequired,
  errors: PropTypes.array,
  onRadioChange: PropTypes.func,
  whichApp: PropTypes.string
}

export default Form
