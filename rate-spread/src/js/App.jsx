import React, { Component } from 'react'
import Header from './Header.jsx'
import AppIntro from './AppIntro.jsx'
import CSVUpload from './CSVUpload.jsx'
import Form from './Form.jsx'
import Footer from './Footer.jsx'

const App = () => {
  return [
    <Header key={1} />,
    <div key={2} className="usa-grid" id="main-content">
      <AppIntro />
      <Form />
      <CSVUpload />
    </div>,
    <Footer key={3} />
  ]
}

export default App
