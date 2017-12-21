import React from 'react'

const AppIntro = () => {
  return [
    <h2 key={1}>Rate Spread Calculator</h2>,
    <p key={2}>
      This calculator provides rate spreads for HMDA reportable loans with a
      final action date on or after January 1st, 2018. Use the{' '}
      <a href="https://www.ffiec.gov/ratespread/newcalc.aspx">
        prior rate spread calculator
      </a>{' '}
      for loans with a final action date before January 1st, 2018.
    </p>,
    <p key={3}>
      The rate spread calculator generates the spread between the Annual
      Percentage Rate (APR) and a survey-based estimate of APRs currently
      offered on prime mortgage loans of a comparable type utilizing the
      “Average Prime Offer Rates” fixed table or adjustable table , action
      taken, amortization type, lock-in date, APR, fixed term (loan maturity) or
      variable term (initial fixed-rate period), and reverse mortgage.
    </p>,
    <p key={4}>
      <a href="./requirements.html">Data requirements</a> for the rate spread
      calculator are provided in accordance with Regulation C effective January
      1st, 2018.
    </p>
  ]
}

export default AppIntro
