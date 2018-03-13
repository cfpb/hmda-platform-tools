import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './shared-components/Header.jsx'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <Header
              heading="HMDA tools"
              lead="Here you can find various tools to assist you in getting your HMDA LAR ready for filing."
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <h4>
              <Link to="/file-format-verification">
                File Format Verification
              </Link>
            </h4>
            <p>
              The File Format Verification Tool (FFVT) is a resource for testing
              whether your file meets certain formatting requirements specified
              in the HMDA Filing Instructions Guide.
            </p>
            <Link to="/file-format-verification">Test your file</Link>
          </div>

          <div className="card">
            <h4>
              <Link to="/lar-formatting">LAR formatting</Link>
            </h4>
            <p>
              The LAR Formatting Tool is intended to help financial
              institutions, typically those with small volumes of covered loans
              and applications, to create an electronic file that can be
              submitted to the HMDA Platform.
            </p>
            <Link to="/lar-formatting">Download the tool</Link>
          </div>

          <div className="card">
            <h4>
              <Link to="/rate-spread">Rate Spread</Link>
            </h4>
            <p>
              This calculator provides rate spreads for HMDA reportable loans
              with a final action date on or after January 1st, 2018. Use the{' '}
              <a href="https://www.ffiec.gov/ratespread/newcalc.aspx">
                prior rate spread calculator
              </a>{' '}
              for loans with a final action date before January 1st, 2018.
            </p>
            <Link to="/rate-spread">Get rate spreads</Link>
          </div>

          <div className="card">
            <h4>
              <Link to="/check-digit">Check Digit</Link>
            </h4>
            <p>
              You can use this tool for two functions. The first is to generate
              a two character check digit when you enter a Legal Entity
              Identifier (LEI) and loan or application ID. The second is to
              validate that a check digit is calculated correctly for any
              complete Universal Loan Identifier (ULI) you enter.
            </p>
            <Link to="/check-digit">Get and validate check digits</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
