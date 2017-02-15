import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile } from '../actions'

export function mapStateToProps(state) {
  const {
    uploading,
    file,
    errors
  } = state.app.upload || {
    uploading: false,
    file: null,
    errors: []
  }

  return {
    uploading,
    file,
    errors
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e, file) => {
      e.preventDefault()
      if(file){
       // dispatch(requestUpload(file))
       // startParse
      }
    },

    setFile: e => {
      if(!e.target.files) return
      dispatch(selectFile(e.target.files[0]))
      e.target.value = null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
