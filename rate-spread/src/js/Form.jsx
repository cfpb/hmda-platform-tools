import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import isomorphicFetch from 'isomorphic-fetch'

const defaultState = {
  actionTaken: '1',
  amortization: 'Fixed',
  reverse: '2',
  rateSetDate: '',
  APR: '',
  loanTerm: null
}

const asNumber = val => +val

const parseDate = date => {
  const parts = date.split('/')
  return `${parts[2]}-${parts[0]}-${parts[1]}`
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
  }

  runFetch(url, body) {
    this.props.onFetch()
    return isomorphicFetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    })
  }

  makeChangeHandler(target) {
    return event => {
      this.setState({ [target]: event.target.value })
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const API_URL = 'https://ffiec-api.cfpb.gov/public/rateSpread'
    this.runFetch(API_URL, this.prepareBodyFromState()).then(res => {
      this.props.onCalculated(res)
    })
  }

  prepareBodyFromState() {
    return JSON.stringify({
      actionTakenType: asNumber(this.state.actionTaken),
      amortizationType: asNumber(this.state.loanTerm),
      reverseMortgage: asNumber(this.state.reverse),
      rateType: this.state.amortization + 'Rate',
      apr: asNumber(this.state.APR),
      lockinDate: parseDate(this.state.rateSetDate)
    })
  }

  render() {
    return (
      <form
        className="Form usa-grid"
        id="main-content"
        onSubmit={this.handleFormSubmit}
      >
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

        <label htmlFor="rateSetDate">
          Rate Set Date<span className="usa-text-small">
            Rate set date must be between 01/03/2000 and today&#39;s date
          </span>
        </label>
        <input
          type="input"
          value={this.state.rateSetDate}
          onChange={this.rateSetDateHandler}
          id="rateSetDate"
          placeholder="mm/dd/yyyy"
        />
        <label htmlFor="APR">APR%</label>
        <input
          type="input"
          value={this.state.APR}
          onChange={this.APRHandler}
          id="APR"
          placeholder="0.000%"
        />
        <label htmlFor="loanTerm">Loan Term</label>
        <input
          type="input"
          value={this.state.loanTerm}
          onChange={this.loanTermHandler}
          id="loanTerm"
          placeholder="(1-50 years)"
        />
        <input type="submit" value="Calculate rate spread" />
      </form>
    )
  }
}

Form.propTypes = {
  onCalculated: PropTypes.func.isRequired
}

export default Form
