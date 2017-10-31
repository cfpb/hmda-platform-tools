import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'
import isomorphicFetch from 'isomorphic-fetch'

const defaultState = {
  inputValue: '',
  checkDigit: '',
  uli: '',
  isValidUli: false,
  errors: [],
  isSubmitted: false,
  whichApp: 'get'
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.validateUli = this.validateUli.bind(this)
    this.validateLoanId = this.validateLoanId.bind(this)
  }

  handleRadioChange(app) {
    /*
    when the radio button changes (the app) between get and validate
    clear everything to reset errors and answer
    but keep in the input and update the app
    */
    this.setState({
      ...defaultState,
      inputValue: this.state.inputValue, // keep this around
      whichApp: app
    })
  }

  handleChange(inputValue) {
    /*
    when input changes
    clear everything to reset errors and answer
    but keep the app and update the input
    */
    this.setState({
      ...defaultState,
      inputValue: inputValue,
      whichApp: this.state.whichApp // keep this around
    })
  }

  handleSubmit() {
    this.setState({ isSubmitted: true })

    if (this.state.whichApp === 'get') {
      this.validateLoanId(this.state.inputValue)
    } else {
      this.validateUli(this.state.inputValue)
    }
  }

  setCheckDigit(loanId) {
    // TODO: API call to get the check digit and uli
    const checkDigit = '22'
    const uli = loanId + checkDigit
    this.setState({ uli: uli, checkDigit: checkDigit })
  }

  isValidUli(uli) {
    // TODO: api call to check for validity
    this.setState({ isValidUli: true })
  }

  validateUli(uli) {
    let errors = []

    if (uli.length === 0) {
      errors.push('You have to enter a ULI to get the check digit.')
    }
    /*
    maxlength for a ULI is 45 characters
    see page 20 of
    https://www.consumerfinance.gov/data-research/hmda/static/for-filers/2018/2018-HMDA-FIG.pdf
    */
    if (uli.length > 45) {
      errors.push('A ULI can only be 45 characters.')
    }
    if (!!uli.match(/[^a-zA-Z0-9]/)) {
      errors.push('A ULI can only contain alphanumeric characters.')
    }

    if (errors.length > 0) {
      this.setState({ errors: errors })
    } else {
      this.isValidUli(uli)
    }
  }

  validateLoanId(loanId) {
    let errors = []

    if (loanId.length === 0) {
      errors.push('You have to enter a loan ID to get the check digit.')
    }
    if (!!loanId.match(/[^a-zA-Z0-9]/)) {
      errors.push('A loan id can only contain alphanumeric characters.')
    }
    /*
    LEI alone is 20 characters
    loanId = LEI + loan/application id from the institution
    so the loadId.length has to be > 20
    */
    if (loanId.length > 0 && loanId.length <= 20) {
      const characters = loanId.length === 1 ? 'character' : 'characters'
      errors.push(
        'The loan id you entered is only ' +
          loanId.length +
          ' ' +
          characters +
          '. An LEI is 20 characters in length.'
      )
    }

    /*
    maxlength for a ULI is 45 characters
    a loanId is part of the ULI
    and removing the 2 characters for check digit
    the loanID.length !> 43
    */
    if (loanId.length > 43) {
      errors.push(
        'The load ID you entered is ' +
          loanId.length +
          ' characters. It can not be more than 43 characters.'
      )
    }

    if (errors.length > 0) {
      this.setState({ errors: errors })
    } else {
      this.setCheckDigit(loanId)
    }
  }

  render() {
    const {
      inputValue,
      whichApp,
      uli,
      isValidUli,
      checkDigit,
      errors,
      isSubmitted
    } = this.state

    return [
      <BannerBeta key={1} />,
      <Header key={2} />,
      <InputError
        key={3}
        errors={errors}
        answer={checkDigit}
        isSubmitted={isSubmitted}
      />,
      <Form
        key={4}
        inputValue={inputValue}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        validateUli={this.validateUli}
        validateLoanId={this.validateLoanId}
        errors={errors}
        onRadioChange={this.handleRadioChange}
        whichApp={whichApp}
      />,
      <Answer
        key={5}
        uli={uli}
        isValidUli={isValidUli}
        checkDigit={checkDigit}
        isSubmitted={isSubmitted}
        errors={errors}
      />,
      <Footer key={6} />
    ]
  }
}
