import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'

const defaultState = {
  checkDigit: '',
  errors: []
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
    this.validateUli(uli)
    this.setCheckDigit(uli)
  }

  setCheckDigit(uli) {
    if (this.state.errors.length === 0) {
      // TODO: calculate check digit
      // const checkDigit = calcCheckDigit(uli)
      const checkDigit = uli + 1
      this.setState({ checkDigit: checkDigit })
    }
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

    this.setState({errors: errors})
  }

  render() {
    const checkDigit = this.state.checkDigit
    const errors = this.state.errors

    return [
      <BannerBeta />,
      <Header />,
      <InputError errors={errors} answer={checkDigit} />,
      <Form
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        validate={this.validateUli}
      />,
      <Answer answer={checkDigit} />,
      <Footer />
    ]
  }
}
