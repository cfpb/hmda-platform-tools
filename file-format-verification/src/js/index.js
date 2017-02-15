import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import AppContainer from './containers/App.jsx'
import UploadContainer from './containers/UploadForm.jsx'

import appReducer from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  combineReducers(
    {
      app: appReducer,
    }
  ),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

render(
  <Provider store={store}>
    <AppContainer>
      <div className="usa-grid">
        <div className="usa-width-two-thirds padding-left-1 padding-right-1">
          <h2>File Format Verification Tool</h2>
          <p>Select a HMDA file from your computer and test whether it meets the format requirements. Note that no data, HMDA or otherwise, is transferred off of your computer during this test.</p>
          <UploadContainer/>
        </div>
        <div className="usa-width-one-third usa-text-small">
          <p>This website is a resource for testing whether your file meets the requirements provided in the Filing Instructions Guide for HMDA data collected in 2017. This website does not allow you to submit your HMDA data.</p>
          <p>This website does not transmit any HMDA data over the Internet, and your supervising Federal agency will not receive or be able to view the files you test on this website. Instead, this website checks the file you are testing using technology called parsing; and your data never leaves your computer using technology referred to as “client-side testing.”</p>
          <p>Client-side testing will run efficiently for most files, but it will run slowly for files containing a larger number of LARs. It is recommended that HMDA filers with more than 20,000 LAR rows, break up their files into smaller sizes.</p>
          <p>This website essentially runs on the same software as the HMDA Platform. This means that if your file passes all the checks on this website, then your file will be in the correct format required to be uploaded to the HMDA Platform.</p>
          <p>This website was developed with no server logging technology, no login functions, and does not log identifying information about your or your files. This website simply allows HMDA filers to test the formatting of their files and be certain that no errors are logged or monitored.</p>
          <p>The web site will have minimal formatting/style.</p>
        </div>
      </div>
    </AppContainer>
  </Provider>,
  document.getElementById('app')
);
