import React from 'react'
import BannerUSA from './BannerUSA.jsx'

const Header = () => {
  return [
    <a key={1} className="usa-skipnav" href="#main-content">
      Skip to main content
    </a>,
    <header key={2} className="usa-header usa-header-basic" role="banner">
      <BannerUSA />
      <div className="usa-nav-container">
        <div className="usa-logo" id="logo">
          <img src="/img/ffiec-logo.png" width="125px" />
        </div>
      </div>
    </header>
  ]
}

export default Header
