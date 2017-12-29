import React, { Component } from 'react'
import LoadingIcon from './LoadingIcon.jsx'
import Alert from './Alert.jsx'

class AppIntro extends Component {
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
      <div className="AppIntro">
        <h2>Rate Spread Calculator</h2>
        <p>
          This calculator provides rate spreads for HMDA reportable loans with a
          final action date on or after January 1st, 2018. Use the{' '}
          <a href="https://www.ffiec.gov/ratespread/newcalc.aspx">
            prior rate spread calculator
          </a>{' '}
          for loans with a final action date before January 1st, 2018.
        </p>
        <p>
          The rate spread calculator generates the spread between the Annual
          Percentage Rate (APR) and a survey-based estimate of APRs currently
          offered on prime mortgage loans of a comparable type utilizing the
          “Average Prime Offer Rates”{' '}
          <a
            download
            href="https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableFixed.txt"
          >
            fixed table
          </a>{' '}
          or{' '}
          <a
            href="https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableAdjustable.txt"
            download
          >
            adjustable table
          </a>, action taken, amortization type, lock-in date, APR, fixed term
          (loan maturity) or variable term (initial fixed-rate period), and
          reverse mortgage.
        </p>
        <p>
          <a href="./requirements.html">Data requirements</a> for the rate
          spread calculator are provided in accordance with Regulation C
          effective January 1st, 2018.
        </p>
        <p>
          You can also{' '}
          <input
            onChange={this.handleCSVSelect}
            type="file"
            href="#"
            id="csvfile"
          />
          <label className="usa-button csvLabel" htmlFor="csvfile">
            Upload a csv
          </label>{' '}
          to calculate many rate spreads at once. Please see{' '}
          <a href="http://cfpb.github.io/hmda-platform/rate-spread/#batch">
            the batch section of the API documentation
          </a>{' '}
          for information on csv formatting.
        </p>
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

export default AppIntro
