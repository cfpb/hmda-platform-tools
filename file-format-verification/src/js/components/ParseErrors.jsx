import React, { Component, PropTypes } from 'react'
import LoadingIcon from './LoadingIcon.jsx'

const renderLarErrors= (larErrors) => {
  if(larErrors.length === 0) return null
  return (
    <table className="margin-bottom-0" width="100%">
      <caption>
        <h3>LAR Errors</h3>
        <p>Formatting errors in loan application records, arranged by row.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Errors</th>
        </tr>
      </thead>
      <tbody>
        {larErrors.map((larErrorObj, i) => {
          return (
            <tr key={i}>
              <td>{larErrorObj.row}</td>
              <td>{larErrorObj.error}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const renderTSErrors = (transmittalSheetErrors) => {
  if(transmittalSheetErrors.length === 0) return null
  return (
    <table className="margin-bottom-0" width="100%">
      <caption>
        <h3>Transmittal Sheet Errors</h3>
        <p>Formatting errors in the transmittal sheet, the first row of your HMDA file.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Transmittal Sheet Errors</th>
        </tr>
      </thead>
      <tbody>
        {transmittalSheetErrors.map((tsError, i) => {
          return <tr key={i}><td>1</td><td>{tsError}</td></tr>
        })}
      </tbody>
    </table>
  )
}

const renderParseResults = (count) => {
  const successCopy = 'Congratulations! Your file has no formatting errors.'
  const failCopy = 'Your file failed to parse. Please fix the following errors and try again.'
  const numberOfFieldsWarning = <p>Rows with incorrect number of fields will need to be fixed and the file will need to be reuploaded before the remaining formatting requirements can be checked.</p>
  const errorText = count === 1 ? 'Error' : 'Errors'
  const noErrors = count === 0

  return (
    <div className={'ParseResults ' + (noErrors ? 'usa-alert-success' : 'usa-alert-error')}>
      <h2 className={noErrors ? 'text-green' : 'text-secondary'}>
        {noErrors ? 'No' : count} Formatting {errorText}
      </h2>
      <p className="usa-font-lead">{noErrors ? successCopy : failCopy}</p>
      {noErrors ? null : numberOfFieldsWarning }
    </div>
  )
}

const ParseErrors = (props) => {
  const { parsed, isParsing, transmittalSheetErrors, larErrors } = props
  const count = transmittalSheetErrors.length + larErrors.length

  if(isParsing) return <LoadingIcon/>
  if(!parsed) return null

  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      {renderParseResults(count)}
      {renderTSErrors(transmittalSheetErrors)}
      {renderLarErrors(larErrors)}
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
