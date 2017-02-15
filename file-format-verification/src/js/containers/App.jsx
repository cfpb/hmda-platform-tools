import React, { Component } from 'react'
import { connect } from 'react-redux'
import BannerUSA from '../components/BannerUSA.jsx'

export class AppContainer extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
      <div className="AppContainer">
        <a className="usa-skipnav" href="#main-content">Skip to main content</a>
        <header className="usa-header usa-header-basic" role="banner">
          <BannerUSA />
          <div className="usa-nav-container">
            <div className="usa-logo" id="logo">
              <img src="/img/ffiec-logo.png" width="125px"/>
            </div>
            <div className="WIP usa-alert-warning usa-text-small">
              <h5>This website is a work in progress</h5>
              <p>This is part of our work to improve the HMDA electronic reporting process for financial institutions.</p>
            </div>
          </div>
        </header>

        {this.props.children}

        <footer className="usa-footer usa-footer-slim" role="contentinfo">
          <div className="usa-grid usa-footer-return-to-top">
            <a href="#">Return to top</a>
          </div>
          <div className="usa-footer-primary-section">
            <div className="usa-grid-full">
              <nav className="usa-footer-nav usa-width-one-half">
                <ul className="usa-unstyled-list">
                  <li className="usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="https://www.ffiec.gov/">FFIEC</a>
                  </li>
                </ul>
              </nav>
              <div className="usa-width-one-half">
                <div className="usa-footer-primary-content usa-footer-contact_info">
                  <h4>Questions?</h4>
                  <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AppContainer)
