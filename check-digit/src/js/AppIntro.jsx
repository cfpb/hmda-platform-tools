import React from 'react'

const AppIntro = () => {
  return [
    <h2 key={1}>Check Digit Tool</h2>,
    <p key={2} className="usa-font-lead">
      You can use this tool for two functions. The first is generating a check
      digit when you enter a loan ID. The second is validating any ULI that you
      enter by making sure the check digit is calculated correctly.
    </p>
  ]
}

export default AppIntro
