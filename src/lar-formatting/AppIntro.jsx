import React from 'react'
import Header from '../shared-components/Header.jsx'

const AppIntro = () => {
  return [
    <Header
      key={1}
      type="main"
      headingText="Loan/Application Register (LAR) Formatting Tool"
      paragraphText="The LAR Formatting Tool is intended to help financial institutions,
        typically those with small volumes of covered loans and applications, to
        create an electronic file that can be submitted to the HMDA Platform."
    >
      <React.Fragment>
        <p>
          Filers will not need to use the LAR Formatting Tool if they are able
          to format their HMDA data into a pipe delimited text file by using,
          for example, vendor HMDA software, the financial institution’s current
          Loan Origination Software (LOS), or applications such as Microsoft®
          Access® or Excel® that may be used for data entry and formatting.
        </p>
        <p>
          Please review Section 2 of the{' '}
          <a href="/tools/static/hmda-tools-instructions.pdf" download={true}>
            HMDA Tools Instructions
          </a>{' '}
          guide prior to downloading the tool.
        </p>
      </React.Fragment>
    </Header>,

    <h4 key={2}>Downloads</h4>,

    <ul key={3}>
      <li>
        <a
          href="/tools/static/2017/2017-hmda-lar-formatting-tool.xlsm"
          download={true}
        >
          2017 LAR Formatting Tool
        </a>
      </li>
      <li>
        <a
          href="/tools/static/2018/2018-hmda-lar-formatting-tool.xlsm"
          download={true}
        >
          2018 LAR Formatting Tool
        </a>
      </li>
    </ul>
  ]
}

export default AppIntro
