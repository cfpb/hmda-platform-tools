import React, { Component } from 'react'
import LoadingIcon from './LoadingIcon.jsx'
import Alert from './Alert.jsx'
import runFetch from './runFetch.js'

const defaultState = {
  actionTaken: '1',
  amortization: 'Fixed',
  reverse: '2',
  rateSetDate: '',
  APR: '',
  loanTerm: null,
  validationErrors: {},
  isFetching: false,
  error: false,
  errorText: '',
  rateSpread: ''
}

const startDate = new Date('01/02/2017').getTime()
const today = Date.now()

const asNumber = val => +val

const parseDate = date => {
  const parts = date.split('/')
  return `${parts[2]}-${parts[0]}-${parts[1]}`
}

const getNumericAPR = apr => {
  if (apr.match(/%$/)) apr = apr.slice(0, -1)
  return +apr
}

const validatedInput = {
  rateSetDate: {
    validate(date) {
      const parts = date.split('/')
      if (parts.length !== 3) return true
      const numericDate = new Date(date).getTime()
      if (numericDate < startDate || numericDate > today) return true
      return false
    },
    text:
      "Rate set date must be in mm/dd/yyyy format and between 01/02/2017 and today's date"
  },
  APR: {
    validate(apr) {
      apr = getNumericAPR(apr)
      return isNaN(apr) || apr < 0 || apr > 99.999
    },
    text: 'APR must be a number between 0 and 99.999'
  },
  loanTerm: {
    validate(term) {
      return isNaN(asNumber(term)) || term > 50 || term < 1
    },
    text: 'Loan term must be a number between 1 and 50.'
  }
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.actionTakenHandler = this.makeChangeHandler('actionTaken')
    this.amortizationHandler = this.makeChangeHandler('amortization')
    this.reverseHandler = this.makeChangeHandler('reverse')
    this.rateSetDateHandler = this.makeChangeHandler('rateSetDate')
    this.APRHandler = this.makeChangeHandler('APR')
    this.loanTermHandler = this.makeChangeHandler('loanTerm')

    this.rateSetValidator = this.makeValidator('rateSetDate')
    this.APRValidator = this.makeValidator('APR')
    this.loanTermValidator = this.makeValidator('loanTerm')
  }

  onFetch() {
    this.setState({ isFetching: true, error: false, errorText: '' })
  }

  onCalculated(response) {
    if (response.status) {
      return this.setState({
        isFetching: false,
        error: true,
        errorText: response.status === 404 ? response.statusText : ''
      })
    }
    this.setState({
      isFetching: false,
      rateSpread: response.rateSpread
    })
  }

  makeChangeHandler(target) {
    return event => {
      if (this.state.validationErrors[target]) {
        if (
          validatedInput[target].validate(event.target.value) !==
          this.state.validationErrors[target]
        )
          this.setValidationErrors(target, event)
      }
      this.setState({ [target]: event.target.value })
    }
  }

  setValidationErrors(target, event) {
    this.setState({
      validationErrors: {
        ...this.state.validationErrors,
        [target]: validatedInput[target].validate(event.target.value)
      }
    })
  }

  makeValidator(target) {
    return event => this.setValidationErrors(target, event)
  }

  handleFormSubmit(event) {
    event.preventDefault()

    this.onFetch()
    const API_URL = 'https://ffiec-api.cfpb.gov/public/rateSpread'
    runFetch(API_URL, this.prepareBodyFromState()).then(res => {
      this.onCalculated(res)
    })
  }

  prepareBodyFromState() {
    return JSON.stringify({
      actionTakenType: asNumber(this.state.actionTaken),
      loanTerm: asNumber(this.state.loanTerm),
      reverseMortgage: asNumber(this.state.reverse),
      amortizationType: this.state.amortization + 'Rate',
      apr: getNumericAPR(this.state.APR),
      lockInDate: parseDate(this.state.rateSetDate)
    })
  }

  render() {
    const rateSetError = this.state.validationErrors.rateSetDate
    const APRError = this.state.validationErrors.APR
    const loanTermError = this.state.validationErrors.loanTerm

    return (
      <div>
        <form className="Form" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <legend>
              Action Taken Type<span className="usa-text-small">
                If Action Taken Type is 3, 4, 5, 6, or 7, report Rate Spread as{' '}
                <strong>NA</strong>
              </span>
            </legend>
            <input
              type="radio"
              id="actionTaken1"
              name="actionTaken"
              value="1"
              onChange={this.actionTakenHandler}
              checked={this.state.actionTaken === '1'}
            />
            <label htmlFor="actionTaken1">1</label>
            <input
              type="radio"
              id="actionTaken2"
              name="actionTaken"
              value="2"
              onChange={this.actionTakenHandler}
              checked={this.state.actionTaken === '2'}
            />
            <label htmlFor="actionTaken2">2</label>
            <input
              type="radio"
              id="actionTaken8"
              name="actionTaken"
              value="8"
              onChange={this.actionTakenHandler}
              checked={this.state.actionTaken === '8'}
            />
            <label htmlFor="actionTaken8">8</label>
          </fieldset>
          <fieldset>
            <legend>
              Reverse Mortgage<span className="usa-text-small">
                If Reverse Mortgage is 1, report Rate Spread as{' '}
                <strong>NA</strong>
              </span>
            </legend>

            <input
              type="radio"
              id="reverse2"
              name="reverse"
              value="2"
              onChange={this.reverseHandler}
              checked={this.state.reverse === '2'}
            />
            <label htmlFor="reverse2">2</label>
          </fieldset>
          <fieldset>
            <legend>Amortization Type</legend>
            <input
              type="radio"
              id="amortizationFixed"
              name="amortization"
              value="Fixed"
              onChange={this.amortizationHandler}
              checked={this.state.amortization === 'Fixed'}
            />
            <label htmlFor="amortizationFixed">Fixed</label>
            <input
              type="radio"
              id="amortizationVariable"
              name="amortization"
              value="Variable"
              onChange={this.amortizationHandler}
              checked={this.state.amortization === 'Variable'}
            />
            <label htmlFor="amortizationVariable">Variable</label>
          </fieldset>

          <div className={rateSetError ? 'usa-input-error' : ''}>
            <label htmlFor="rateSetDate">
              Rate Set Date<span className="usa-text-small">
                Rate set date must be between 01/02/2017 and today&#39;s date
              </span>
            </label>
            {rateSetError ? (
              <h4 className="usa-input-error-message" role="alert">
                {validatedInput.rateSetDate.text}
              </h4>
            ) : null}
            <input
              type="input"
              value={this.state.rateSetDate}
              onChange={this.rateSetDateHandler}
              onBlur={this.rateSetValidator}
              id="rateSetDate"
              placeholder="mm/dd/yyyy"
            />
          </div>
          <div className={APRError ? 'usa-input-error' : ''}>
            <label htmlFor="APR">APR%</label>
            {APRError ? (
              <h4 className="usa-input-error-message" role="alert">
                {validatedInput.APR.text}
              </h4>
            ) : null}
            <input
              type="input"
              value={this.state.APR}
              onChange={this.APRHandler}
              onBlur={this.APRValidator}
              id="APR"
              placeholder="0.000%"
            />
          </div>
          <div className={loanTermError ? 'usa-input-error' : ''}>
            <label htmlFor="loanTerm">Loan Term</label>
            {loanTermError ? (
              <h4 className="usa-input-error-message" role="alert">
                {validatedInput.loanTerm.text}
              </h4>
            ) : null}
            <input
              type="input"
              value={this.state.loanTerm}
              onChange={this.loanTermHandler}
              onBlur={this.loanTermValidator}
              id="loanTerm"
              placeholder="(1-50 years)"
            />
          </div>
          <input
            disabled={rateSetError || APRError || loanTermError}
            type="submit"
            value="Calculate rate spread"
          />
        </form>
        {this.state.isFetching ? (
          <LoadingIcon />
        ) : this.state.error ? (
          <Alert
            className="usa-width-two-thirds"
            type="error"
            heading="Sorry, an error has occured."
          >
            {this.state.errorText ? (
              <p>{this.state.errorText}</p>
            ) : (
              <p>
                Please try again later. If the problem persists, contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            )}
          </Alert>
        ) : this.state.rateSpread ? (
          <Alert
            className="usa-width-two-thirds"
            type="success"
            heading="Rate Spread"
          >
            <p>{this.state.rateSpread}</p>
          </Alert>
        ) : null}
      </div>
    )
  }
}

export default Form
