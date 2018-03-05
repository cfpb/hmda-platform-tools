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
              lead="You can use the HMDA tools to do stuff."
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <h4>
              <Link to="/check-digit">Check Digit</Link>
            </h4>
            <p>
              Loan-level data are also available as zipped raw flat files, which
              can be imported into statistical software packages or Microsoft
              Excel for analysis.
            </p>
            <Link to="/check-digit">Start now</Link>
          </div>

          <div className="card">
            <h4>
              <Link to="/rate-spread">Rate Spread</Link>
            </h4>
            <p>
              Loan-level data are also available as zipped raw flat files, which
              can be imported into statistical software packages or Microsoft
              Excel for analysis.
            </p>
            <Link to="/rate-spread">Start now</Link>
          </div>

          <div className="card">
            <h4>
              <Link to="/file-format-verification">
                File Format Verification
              </Link>
            </h4>
            <p>
              Loan-level data are also available as zipped raw flat files, which
              can be imported into statistical software packages or Microsoft
              Excel for analysis.
            </p>
            <Link to="/file-format-verification">Start now</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
