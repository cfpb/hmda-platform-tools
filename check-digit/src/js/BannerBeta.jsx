import React from 'react'

const BannerBeta = () => {
  return (
    <div className="BannerBeta usa-alert-warning usa-text-small">
      <h4>
        <img src="./img/error-round.png" alt="Warning icon" />This website is a
        work in progress
      </h4>
      <p>
        This is part of our work to improve the HMDA electronic reporting
        process for financial institutions.
      </p>
      <p>
        For more information about filing your HMDA data, please visit{' '}
        <a target="_blank" href="https://www.ffiec.gov/hmda/">
          https://www.ffiec.gov/hmda/
        </a>.
      </p>
    </div>
  )
}

export default BannerBeta
