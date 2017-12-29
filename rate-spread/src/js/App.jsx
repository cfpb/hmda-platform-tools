import React, { Component } from 'react'
import isomorphicFetch from 'isomorphic-fetch'
import fileSaver from 'file-saver'
import Header from './Header.jsx'
import AppIntro from './AppIntro.jsx'
import CSVUpload from './CSVUpload.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Alert from './Alert.jsx'
import Footer from './Footer.jsx'

const defaultState = {
  isFetching: false,
  isCSVFetching: false,
  csvFilename: '',
  csvError: false,
  error: false,
  rateSpread: ''
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.onFetch = this.onFetch.bind(this)
    this.onCSVFetch = this.onCSVFetch.bind(this)
    this.onCalculated = this.onCalculated.bind(this)
    this.onCSVCalculated = this.onCSVCalculated.bind(this)
  }

  runFetch(url, body, isCSV) {
    return isomorphicFetch(url, {
      method: 'POST',
      body: body,
      headers: isCSV
        ? {}
        : {
            'Content-Type': 'application/json'
          }
    })
      .then(response => {
        return new Promise(resolve => {
          if (response.status > 399) return resolve(response)
          if (isCSV) return resolve(response.text())
          resolve(response.json())
        })
      })
      .catch(err => {
        return { status: 400 }
      })
  }

  onFetch() {
    this.setState({ isFetching: true, error: false })
  }

  onCSVFetch() {
    this.setState({ isCSVFetching: true, csvError: false })
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

  onCSVCalculated(response, file) {
    if (response.status) {
      return this.setState({
        isCSVFetching: false,
        csvError: true
      })
    }

    const filename = 'calculated-' + file.name

    this.setState({
      isCSVFetching: false,
      csvFilename: filename
    })

    return fileSaver.saveAs(
      new Blob([response], { type: 'text/csv;charset=utf-16' }),
      filename
    )
  }

  render() {
    return [
      <Header key={1} />,
      <div key={2} className="usa-grid" id="main-content">
        <AppIntro />
        <Form
          onFetch={this.onFetch}
          onCalculated={this.onCalculated}
          runFetch={this.runFetch}
          isFetching={this.state.isFetching}
          rateSpread={this.state.rateSpread}
          error={this.state.error}
        />
        <CSVUpload
          onCSVFetch={this.onCSVFetch}
          onCSVCalculated={this.onCSVCalculated}
          runFetch={this.runFetch}
          isCSVFetching={this.state.isCSVFetching}
          csvFilename={this.state.csvFilename}
          csvError={this.state.csvError}
        />
      </div>,
      <Footer key={3} />
    ]
  }
}
