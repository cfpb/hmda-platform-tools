import parseFile from '../helpers/parseFile.js'
import * as types from '../constants'

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}

function checkErrors(file) {
  const errors = []
  if(file) {
    if(file.size === 0) {
      errors.push('The file you uploaded does not contain any data. Please check your file and re-upload.')
    }
    if(file.name.split('.').slice(-1)[0] !== 'txt') {
      errors.push('The file you uploaded is not a text file (.txt). Please check your file and re-upload.')
    }
  }
  return errors
}

export function selectFile(file) {
  return {
    type: types.SELECT_FILE,
    file,
    errors: checkErrors(file)
  }
}

export function beginParse() {
  return {
    type: types.BEGIN_PARSE
  }
}

export function endParse(data) {
  return {
    type: types.END_PARSE,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors
  }
}

export function triggerParse(file) {
  return dispatch => {
    dispatch(beginParse())
    return parseFile(file)
      .then(json => {
        dispatch(endParse(json))
      })
      .catch(err => console.error(err))
  }
}
