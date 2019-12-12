jest.unmock('../../containers/App.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import AppContainer from '../../containers/App.jsx'
import Wrapper from '../Wrapper.js'


describe('AppContainer', () => {
  console.error = jest.fn()
  const wrappedContainer = TestUtils.renderIntoDocument(
    <Wrapper store={{app:{}}}>
      <AppContainer><p>hey</p></AppContainer>
    </Wrapper>
  )

  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
    expect(containerNode.firstChild.textContent).toEqual('hey')
    expect(console.error).not.toBeCalled()
  })
})
