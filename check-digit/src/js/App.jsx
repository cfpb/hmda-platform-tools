import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'

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
    this.setState({
      ...defaultState,
      inputValue: this.state.inputValue, // keep this around
      whichApp: app
    })
  }

  handleChange(inputValue) {
    // when input changes reset state to hide error(s)
    // and clear the check digit, it will need re-calculated
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
    // TODO: calculate check digit
    // const checkDigit = calcCheckDigit(uli)
    const checkDigit = '22'
    const uli = loanId + checkDigit
    this.setState({ uli: uli, checkDigit: checkDigit })
  }

  isValidUli(uli) {
    this.setState({ isValidUli: true })
  }

  validateUli(uli) {
    let errors = []

    if (uli.length === 0) {
      errors.push('You have to enter a ULI to get the check digit.')
    }
    // maxlength for a ULI is 45 characters
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
    let characters = 'characters'

    if (loanId.length === 0) {
      errors.push('You have to enter a loan ID to get the check digit.')
    }
    if (!!loanId.match(/[^a-zA-Z0-9]/)) {
      errors.push('A loan id can only contain alphanumeric characters.')
    }
    // LEI alone is 20 characters
    if (loanId.length > 0 && loanId.length <= 20) {
      if (loanId.length === 1) characters = 'character'
      errors.push(
        'The loan id you entered is only ' +
          loanId.length +
          ' ' +
          characters +
          '. An LEI is 20 characters in length.'
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
