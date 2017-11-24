import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'
import isomorphicFetch from 'isomorphic-fetch'
import { isUliValid, isLoanIdValid } from './utils/index.js'

const defaultState = {
  inputValue: '',
  checkDigit: null,
  uli: null,
  isValidUli: null,
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
    this.validateInput = this.validateInput.bind(this)
    this.getCheckDigit = this.getCheckDigit.bind(this)
    this.getIsUliValid = this.getIsUliValid.bind(this)
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
    /* 
    setState callback used
    to make sure isSubmitted is true
    before doing anything else
    */
    this.setState({ isSubmitted: true }, () => {
      this.validateInput(this.state.inputValue)
    })
  }

  getCheckDigit(loanId) {
    if (this.state.isSubmitted) {
      isomorphicFetch(
        'https://hmda-ops-api.demo.cfpb.gov/public/uli/checkDigit',
        {
          method: 'POST',
          body: JSON.stringify({ loanId: this.state.inputValue }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({ uli: json.uli, checkDigit: json.checkDigit })
        })
    }
  }

  getIsUliValid(uli) {
    if (this.state.isSubmitted) {
      isomorphicFetch(
        'https://hmda-ops-api.demo.cfpb.gov/public/uli/validate',
        {
          method: 'POST',
          body: JSON.stringify({ uli: this.state.inputValue }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({ isValidUli: json.isValid })
        })
    }
  }

  validateInput(input) {
    let validateFunction = isLoanIdValid
    let getFunction = this.getCheckDigit

    if (this.state.whichApp === 'validate') {
      validateFunction = isUliValid
      getFunction = this.getIsUliValid
    }

    const errors = validateFunction(input)

    if (errors.length > 0) {
      this.setState({ errors: errors })
    } else {
      getFunction(input)
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
      <InputError key={3} errors={errors} isSubmitted={isSubmitted} />,
      <Form
        key={4}
        inputValue={inputValue}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        validateInput={this.validateInput}
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
