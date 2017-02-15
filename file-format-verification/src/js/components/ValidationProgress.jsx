import React, { PropTypes } from 'react'

const getIndicator = (code, type) => {
  let indicator = <span className="progress"></span>

  switch(type) {
    case 'upload':
      if(code === 2) indicator = <span className="progress progress-running"></span>
      if(code >= 3) {
        indicator = <span className="progress progress-success"></span>
      }
      break;
    case 'parse':
      if(code === 4) indicator = <span className="progress progress-running"></span>
      if(code === 5) indicator = <span className="progress progress-error"></span>
      if(code >= 6) indicator = <span className="progress progress-success"></span>
      break;
    case 'validate':
      if(code === 7) indicator = <span className="progress progress-running"></span>
      if(code === 8) indicator = <span className="progress progress-error"></span>
      if(code >= 9) indicator = <span className="progress progress-success"></span>
      break;
  }

  return indicator
}

const getUploadStatus = (code) => {
  if(code <= 2) return <li>{getIndicator(code, 'upload')} Loading ... </li>
  return <li>{getIndicator(code, 'upload')} File loaded</li>
}

const getParsingStatus = (code) => {
  let textClass = ''
  if(code < 4) textClass = 'text-gray-light'
  if(code <= 4) return <li className={textClass}>{getIndicator(code, 'parse')} Parsing ...</li>
  return <li>{getIndicator(code, 'parse')} Parsing complete</li>
}

const ValidationProgress = (props) => {
  const code = props.code

  return (
    <div className="ValidationProgress" style={{textAlign: 'left'}}>
      <ul className="usa-unstyled-list">
        {getUploadStatus(code)}
        {getParsingStatus(code)}
      </ul>
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
}

export default ValidationProgress
