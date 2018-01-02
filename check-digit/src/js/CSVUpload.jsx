import React, { Component } from 'react'
import fileSaver from 'file-saver'
import LoadingIcon from './LoadingIcon.jsx'
import Alert from './Alert.jsx'
import runFetch from './utils/runFetch.js'

const defaultState = {
  isFetching: false,
  filename: '',
  error: false
}

class CSVUpload extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleCSVSelect = this.handleCSVSelect.bind(this)
  }

  onCSVFetch() {
    this.setState({ isFetching: true, error: false })
  }

  onCSVCalculated(response, file, prefix) {
    if (response.status) {
      return this.setState({
        isFetching: false,
        error: true
      })
    }

    const filename = prefix + '-' + file.name

    this.setState({
      isFetching: false,
      filename: filename
    })

    return fileSaver.saveAs(
      new Blob([response], { type: 'text/csv;charset=utf-16' }),
      filename
    )
  }

  makeSelectHandler(url, prefix) {
    return event => this.handleCSVSelect(event, url, prefix)
  }

  handleCSVSelect(event, url, prefix) {
    event.preventDefault()
    const file = event.target.files[0]
    if (!file) return

    event.target.value = null

    this.onCSVFetch()
    runFetch(url, this.prepareCSVBody(file), true).then(res => {
      this.onCSVCalculated(res, file, prefix)
    })
  }

  prepareCSVBody(file) {
    const data = new FormData()
    data.append('file', file)
    return data
  }

  render() {
    return (
      <div className="CSVUpload usa-width-one-third">
        <div className="usa-alert">
          <p>
            You can also upload a csv to generate or validate many check digits
            at once.
          </p>
          <input
            onChange={this.makeSelectHandler(
              'https://ffiec-api.cfpb.gov/public/uli/checkDigit/csv',
              'generated'
            )}
            type="file"
            href="#"
            id="generateCSV"
          />
          <p>
            <label className="usa-button csvLabel" htmlFor="generateCSV">
              Generate check digits
            </label>{' '}
          </p>
          <p>
            <input
              onChange={this.makeSelectHandler(
                'https://ffiec-api.cfpb.gov/public/uli/validate/csv',
                'validated'
              )}
              type="file"
              href="#"
              id="validateCSV"
            />
            <label className="usa-button csvLabel" htmlFor="validateCSV">
              Validate check digits
            </label>
          </p>
          <p>
            Please see{' '}
            <a href="http://cfpb.github.io/hmda-platform/uli/#generate-batch">
              the batch section of the API documentation
            </a>{' '}
            for information on csv formatting.
          </p>
        </div>
        {this.state.isFetching ? (
          <LoadingIcon />
        ) : this.state.error ? (
          <Alert
            type="error"
            heading="Sorry, an error has occured processing your file."
          >
            <p>
              Please check your file format and try again later. If the problem
              persists, contact <a href="mailto:hmdahelp@cfpb.gov">
                HMDA Help
              </a>.
            </p>
          </Alert>
        ) : this.state.filename ? (
          <Alert
            type="success"
            heading="Batch rate spread calculation complete"
          >
            <p>
              Downloaded{' '}
              <h4 style={{ display: 'inline' }}>{this.state.filename}</h4> with
              your batch results.
            </p>
          </Alert>
        ) : null}
      </div>
    )
  }
}

export default CSVUpload
