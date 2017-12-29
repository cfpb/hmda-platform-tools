import React, { Component } from 'react'
import LoadingIcon from './LoadingIcon.jsx'
import Alert from './Alert.jsx'

class CSVUpload extends Component {
  constructor(props) {
    super(props)
    this.handleCSVSelect = this.handleCSVSelect.bind(this)
  }

  handleCSVSelect(event) {
    event.preventDefault()
    const file = event.target.files[0]
    if (!file) return

    event.target.value = null

    this.props.onCSVFetch()
    const CSV_URL = 'https://ffiec-api.cfpb.gov/public/rateSpread/csv'
    this.props.runFetch(CSV_URL, this.prepareCSVBody(file), true).then(res => {
      this.props.onCSVCalculated(res, file)
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
            You can also upload a csv to calculate many rate spreads at once.
          </p>
          <input
            onChange={this.handleCSVSelect}
            type="file"
            href="#"
            id="csvfile"
          />
          <label className="usa-button csvLabel" htmlFor="csvfile">
            Upload a csv
          </label>{' '}
          <p>
            Please see{' '}
            <a href="http://cfpb.github.io/hmda-platform/rate-spread/#batch">
              the batch section of the API documentation
            </a>{' '}
            for information on csv formatting.
          </p>
        </div>
        {this.props.isCSVFetching ? (
          <LoadingIcon />
        ) : this.props.csvError ? (
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
        ) : this.props.csvFilename ? (
          <Alert
            type="success"
            heading="Batch rate spread calculation complete"
          >
            <p>
              Downloaded{' '}
              <h4 style={{ display: 'inline' }}>
                {this.props.csvFilename}
              </h4>{' '}
              with your batch results.
            </p>
          </Alert>
        ) : null}
      </div>
    )
  }
}

export default CSVUpload
