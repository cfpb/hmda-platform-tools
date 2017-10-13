import React, { Component } from 'react'
import BannerUSA from './BannerUSA.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { uli: '', checkDigit: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(uli) {
    this.setState({ uli: uli })
  }

  handleSubmit() {
    // TODO: calculate check digit
    // const checkDigit = calcCheckDigit(this.state.uli)
    const checkDigit = this.state.uli + 1
    this.setState({ checkDigit: checkDigit })
  }

  render() {
    const uli = this.state.uli
    const checkDigit = this.state.checkDigit

    return [
      <BannerUSA />,
      <Form
        uli={uli}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />,
      <Answer answer={checkDigit} />
    ]
  }
}
