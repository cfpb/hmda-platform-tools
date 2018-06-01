import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const makeHeadingLink = (headingText, headingLink) => {
  return <Link to={headingLink}>{headingText}</Link>
}

const renderHeading = (type, heading) => {
  if (type === 'main') return <h1>{heading}</h1>
  if (type === 'sub') return <h4>{heading}</h4>
}

const renderHeadingWithSelector = (type, heading, selector) => {
  if (type !== 'main') {
    console.error(
      'Only <h1> can contain selectors. You need to pass the `type` prop with a value of `main` if you are also passing the selector.'
    )
    return null
  }

  return (
    <React.Fragment>
      {selector}
      <h1 style={{ display: 'inline-block' }}>{heading}</h1>
    </React.Fragment>
  )
}

const renderParagraph = (type, paragraphText) => {
  if (type === 'main') return <p className="usa-font-lead">{paragraphText}</p>
  if (type === 'sub') return <p>{paragraphText}</p>
}

const Header = props => {
  let style = { marginBottom: '3em' }
  if (props.type === 'sub') style = { marginBottom: '1em' }

  let heading = props.headingText
  if (props.headingLink)
    heading = makeHeadingLink(props.headingText, props.headingLink)

  let paragraphText = null
  if (props.paragraphText)
    paragraphText = renderParagraph(props.type, props.paragraphText)

  return (
    <header className="header" style={style}>
      {props.selector ? (
        renderHeadingWithSelector(props.type, heading, props.selector)
      ) : (
        renderHeading(props.type, heading)
      )}
      {paragraphText}
      {props.children}
    </header>
  )
}

Header.propTypes = {
  type: PropTypes.oneOf(['main', 'sub']),
  headingText: PropTypes.string,
  paragraphText: PropTypes.string,
  headingLink: PropTypes.string,
  selector: PropTypes.element
}

export default Header
