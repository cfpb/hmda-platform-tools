import 'react-app-polyfill/ie11' // For IE 11 support

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

window.HMDA_ENV = {
  HOMEPAGE_URL: '##HOMEPAGE_URL##',
  HMDA_API: '##HMDA_API##'
}

render(
  <BrowserRouter basename="/tools">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
