import React from 'react'

const AppIntro = () => {
  return [
    <h2 key={1}>Check Digit Tool</h2>,
    <p key={2}>
      You can use this tool for two functions. The first is to generate a two
      character check digit when you enter a Legal Entity Identifier (LEI) and
      loan or application ID. The second is to validate that a check digit is
      calculated correctly for any complete Universal Loan Identifier (ULI) you
      enter.
    </p>
  ]
}

export default AppIntro
