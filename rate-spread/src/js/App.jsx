import React, { Component } from 'react'
import Header from './Header.jsx'
import AppIntro from './AppIntro.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Alert from './Alert.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import Footer from './Footer.jsx'

const defaultState = {
  isFetching: false,
  error: false,
  rateSpread: ''
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.onFetch = this.onFetch.bind(this)
    this.onCalculated = this.onCalculated.bind(this)
  }

  onFetch() {
    this.setState({ isFetching: true, error: false })
  }

  onCalculated(response) {
    if (response.status) {
      return this.setState({
        isFetching: false,
        error: true
      })
    }
    this.setState({
      isFetching: false,
      rateSpread: response.rateSpread
    })
  }

  render() {
    return [
      <Header key={1} />,
      <div key={2} className="usa-grid" id="main-content">
        <AppIntro />
        <Form onFetch={this.onFetch} onCalculated={this.onCalculated} />
        {this.state.isFetching ? (
          <LoadingIcon />
        ) : this.state.error ? (
          <Alert type="error" heading="Sorry, an error has occured.">
            <p>
              Please try again later. If the problem persists, contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
            </p>
          </Alert>
        ) : this.state.rateSpread ? (
          <Alert type="success" heading="Rate Spread">
            <p>{this.state.rateSpread}</p>
          </Alert>
        ) : null}
      </div>,
      <Footer key={3} />
    ]
  }
}
