import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, triggerParse } from '../actions'

export function mapStateToProps(state) {
  const { uploading, file, errors } = state.app.upload || {
    uploading: false,
    file: null,
    errors: []
  }

  const filingPeriod = state.app.filingPeriod || null

  return {
    uploading,
    file,
    filingPeriod,
    errors
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: (acceptedFiles, rejectedFiles) => {
      if (!acceptedFiles || !rejectedFiles) return
      let file = acceptedFiles[0] || rejectedFiles[0]
      dispatch(selectFile(file))
      dispatch(triggerParse(file))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
