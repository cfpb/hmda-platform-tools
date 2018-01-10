import React, { Component } from 'react'
import Header from '../../../shared-components/Header.jsx'
import AppIntro from './AppIntro.jsx'
import CSVUpload from './CSVUpload.jsx'
import Form from './Form.jsx'
import Footer from '../../../shared-components/Footer.jsx'

const App = () => {
  return [
    <Header key={1} />,
    <div key={2} className="usa-grid" id="main-content">
      <div className="usa-width-two-thirds">
        <AppIntro />
        <Form />
      </div>
      <CSVUpload />
    </div>,
    <Footer key={3} />
  ]
}

export default App
