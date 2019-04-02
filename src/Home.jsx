import React from 'react'
import Header from './shared-components/Header.jsx'

import './Home.css'

const Home = () => {
  return (
    <div className="grid home">
      <Header
        type="main"
        headingText="HMDA Tools"
        paragraphText="Here you can find various tools to assist you in getting your HMDA LAR ready for filing."
      />

      <div className="card-container">
        <div className="card">
          <Header
            headingLink="/rate-spread"
            headingText="Rate Spread"
            paragraphText="This calculator provides rate spreads for HMDA reportable loans
              with a final action date on or after January 1st, 2018."
            type="sub"
          />
        </div>

        <div className="card">
          <Header
            headingLink="/lar-formatting"
            headingText="LAR formatting"
            paragraphText="The LAR Formatting Tool is intended to help financial
              institutions, typically those with small volumes of covered loans
              and applications, to create an electronic file that can be
              submitted to the HMDA Platform."
            type="sub"
          />
        </div>

        <div className="card">
          <Header
            headingLink="/file-format-verification"
            headingText="File Format Verification"
            paragraphText="The File Format Verification Tool (FFVT) is a resource for testing
              whether your file meets certain formatting requirements specified
              in the HMDA Filing Instructions Guide."
            type="sub"
          />
        </div>

        <div className="card">
          <Header
            headingLink="/check-digit"
            headingText="Check Digit"
            paragraphText="You can use this tool for two functions. The first is to generate
              a two character check digit when you enter a Legal Entity
              Identifier (LEI) and loan or application ID. The second is to
              validate that a check digit is calculated correctly for any
              complete Universal Loan Identifier (ULI) you enter."
            type="sub"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
