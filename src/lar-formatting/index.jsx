import React, { Component } from 'react'
import AppHeader from '../shared-components/AppHeader.jsx'
import AppIntro from './AppIntro.jsx'
import Footer from '../shared-components/Footer.jsx'

const App = () => {
  return [
    <div key={1} className="usa-grid" id="main-content">
      <div className="usa-width-one-whole">
        <AppIntro />
      </div>
    </div>,
    <Footer key={2} />
  ]
}

export default App
