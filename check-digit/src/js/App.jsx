import React, { Component } from 'react'
import BannerBeta from './BannerBeta.jsx'
import Header from './Header.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import Footer from './Footer.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { checkDigit: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(uli) {
    // TODO: calculate check digit
    // const checkDigit = calcCheckDigit(this.state.uli)
    const checkDigit = uli + 1
    this.setState({ checkDigit: checkDigit })
  }

  render() {
    const uli = this.state.uli
    const checkDigit = this.state.checkDigit

    return [
      <BannerBeta />,
      <Header />,
      <Form onSubmit={this.handleSubmit} />,
      <Answer answer={checkDigit} />,
      <Footer />
    ]
  }
}
