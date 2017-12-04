import React from 'react'

const AppIntro = () => {
  return [
    <h2 key={1}>Check Digit Tool</h2>,
    <p key={2} className="usa-font-lead">
      The check digit tool performs two primary functions, generating a check
      digit and validating a ULI. The tool will generate a two digit check digit
      value based on the combination of LEI and Loan/Application ID provided.
      The check digit value is then added to the LEI and Loan/Application ID to
      form the loan or application's ULI. The tool will also validate a ULI by
      verifying that the check digit value is calculated in accordance with
      procedures defined in the regulation Appendix C to Part 1003.
    </p>
  ]
}

export default AppIntro
