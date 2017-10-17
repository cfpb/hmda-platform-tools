import React from 'react'
import BannerUSA from './BannerUSA.jsx'

const Header = () => {
  return [
    <a className="usa-skipnav" href="#main-content">
      Skip to main content
    </a>,
    <header className="usa-header usa-header-basic" role="banner">
      <BannerUSA />
      <div className="usa-nav-container">
        <div className="usa-logo" id="logo">
          <img src="./img/ffiec-logo.png" width="125px" />
        </div>
      </div>
    </header>
  ]
}

export default Header
