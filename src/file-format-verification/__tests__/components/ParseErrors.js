jest.unmock('../../components/ParseErrors.jsx')

import ParseErrors from '../../components/ParseErrors.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const path = require('path')
const parseJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../json/parseErrors.json')))

describe('Parse errors', () => {
  const parseErrors = TestUtils.renderIntoDocument(
    <Wrapper store={{app: {pagination: {fade: true, previous: 1}}}}>
      <ParseErrors
        isParsing={false}
        parsed={true}
        transmittalSheetErrors={parseJSON.transmittalSheetErrors}
        larErrors={parseJSON.larErrors}
        errors={[]}
        pagination={{fade: true, previous: 1}}
      />
    </Wrapper>
  )
  const parseErrorsNode = ReactDOM.findDOMNode(parseErrors)

  it('renders the parser errors', () => {
    expect(parseErrorsNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(parseErrors, 'tr').length).toEqual(4)
  })
})
