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
              type="main"
              headingText="HMDA tools"
              paragraphText="Here you can find various tools to assist you in getting your HMDA LAR ready for filing."
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <Header
              type="sub"
              headingText="File Format Verification"
              paragraphText="The File Format Verification Tool (FFVT) is a resource for testing
              whether your file meets certain formatting requirements specified
              in the HMDA Filing Instructions Guide."
            />
            <Link to="/file-format-verification">Test your file</Link>
          </div>

          <div className="card">
            <Header
              type="sub"
              headingText="LAR formatting"
              paragraphText="The LAR Formatting Tool is intended to help financial
              institutions, typically those with small volumes of covered loans
              and applications, to create an electronic file that can be
              submitted to the HMDA Platform."
            />
            <Link to="/lar-formatting">Download the tool</Link>
          </div>

          <div className="card">
            <Header
              type="sub"
              headingText="Rate Spread"
              paragraphText="This calculator provides rate spreads for HMDA reportable loans
              with a final action date on or after January 1st, 2018."
            />
            <Link to="/rate-spread">Get rate spreads</Link>
          </div>

          <div className="card">
            <Header
              type="sub"
              headingText="Check Digit"
              paragraphText="You can use this tool for two functions. The first is to generate
              a two character check digit when you enter a Legal Entity
              Identifier (LEI) and loan or application ID. The second is to
              validate that a check digit is calculated correctly for any
              complete Universal Loan Identifier (ULI) you enter."
            />
            <Link to="/check-digit">Get and validate check digits</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
