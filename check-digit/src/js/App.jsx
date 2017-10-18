import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'

const defaultState = {
  checkDigit: '',
  errors: [],
  isSubmitted: false
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateUli = this.validateUli.bind(this)
  }

  handleChange() {
    // when input changes reset state to hide error(s)
    // and clear the check digit, it will need re-calculated
    this.setState(defaultState)
  }

  handleSubmit(uli) {
    this.setState({ isSubmitted: true })
    this.validateUli(uli)
  }

  setCheckDigit(uli) {
    // TODO: calculate check digit
    // const checkDigit = calcCheckDigit(uli)
    const checkDigit = uli + 1
    this.setState({ checkDigit: checkDigit })
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
      this.setCheckDigit(uli)
    }
  }

  render() {
    const { checkDigit, errors, isSubmitted } = this.state

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
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        validate={this.validateUli}
        errors={errors}
      />,
      <Answer key={5} answer={checkDigit} isSubmitted={isSubmitted} />,
      <Footer key={6} />
    ]
  }
}
