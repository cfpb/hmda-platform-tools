import React from 'react'
import { render } from 'react-dom'
import '@babel/polyfill'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Header from '../shared-components/Header.jsx'
import AppContainer from './containers/App.jsx'
import UploadContainer from './containers/UploadForm.jsx'
import ParseErrorsContainer from './containers/ParseErrors.jsx'
import appReducer from './reducers'

const middleware = [thunkMiddleware]
if (process.env.NODE_ENV !== 'production') middleware.push(createLogger())

const store = createStore(
  combineReducers({
    app: appReducer
  }),
  applyMiddleware(...middleware)
)

class FFVT extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <div id="main-content" className="usa-grid">
            <div className="usa-width-one-whole">
              <Header
                heading="File Format Verification Tool"
                lead="Select a HMDA file from your computer and test whether it meets
                certain formatting requirements needed to submit HMDA data
                collected in 2017 to the HMDA Platform. The File Format
                Verification Tool does not test for compliance with edits. No
                data, HMDA or otherwise, is transmitted from your computer to
                the CFPB."
              />
            </div>
          </div>
          <div id="main-content" className="usa-grid">
            <div className="usa-width-two-thirds">
              <UploadContainer />
              <ParseErrorsContainer />
            </div>
            <div className="usa-width-one-third usa-text-small">
              <p>
                The File Format Verification Tool (FFVT) is a resource for
                testing whether your file meets certain formatting requirements
                specified in the HMDA Filing Instructions Guide, specifically
                that the file (1) is pipe-delimited; (2) has the proper number
                of data fields; and (3) has data fields formatted as integers,
                where necessary. The FFVT does not allow you to submit HMDA
                data.
              </p>
              <p>
                The FFVT uses “client-side testing” which runs on the user’s
                computer and does not transmit any HMDA data over the internet.
                Thus, no Federal agency will receive or be able to view the
                files you test using it. The FFVT was developed with no server
                logging technology, no login functions, and does not log
                identifying information about you or your files. The FFVT simply
                allows HMDA filers to test the formatting of their files.
              </p>
              <p>
                The FFVT will run efficiently for most files, but it will run
                more slowly for larger files (e.g., containing more than 20,000
                entries).
              </p>
              <p>
                This website essentially runs on the same software as the HMDA
                Platform. This means that if your file passes all the checks on
                this website, then your file will be in the correct format
                required to be uploaded to the HMDA Platform. The FFVT does not
                check for compliance with HMDA edits.
              </p>
            </div>
          </div>
        </AppContainer>
      </Provider>
    )
  }
}

export default FFVT
