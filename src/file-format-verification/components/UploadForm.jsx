import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

export const renderErrors = errors => {
  if (errors.length === 0) return null

  return (
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <ul className="usa-alert-text">
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default class Upload extends Component {
  constructor(props) {
    super(props)
  }

  updateDropArea() {
    let message =
      'Drag another LAR file into this area or click in this box to select a LAR file to test.'
    let check = this.props.errors.length === 0 ? 'Check' : "Can't check"
    this.dropzoneContent.innerHTML = `<p>${check} "${this.props.file
      .name}".</p><p>${message}</p>`
  }

  componentDidUpdate() {
    this.updateDropArea()
  }

  // keeps the info about the file after leaving /upload and coming back
  componentDidMount() {
    if (this.props.file && 'name' in this.props.file) {
      this.updateDropArea()
    }
  }

  render() {
    const inputError = this.props.errors.length === 0 ? '' : 'input-error'
    // don't do anything if submission is in progress
    const setFile = this.props.code > 1 ? null : this.props.setFile
    const dropzoneDisabled = this.props.code > 1 ? 'dropzone-disabled' : ''
    return (
      <div>
        <div className="UploadForm">
          {renderErrors(this.props.errors)}
          <div className="container-upload">
            <Dropzone
              disablePreview={true}
              onDrop={setFile}
              multiple={false}
              className={`dropzone ${dropzoneDisabled}`}
            >
              <button
                onClick={e => e.preventDefault()}
                ref={node => {
                  this.dropzoneContent = node
                }}
                className="usa-text-small"
              >
                <p>
                  Drag your LAR file into this area or click in this box to
                  select a LAR file to test.
                </p>
              </button>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}
