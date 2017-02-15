import {
  getParseErrors,
} from '../api'
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

export function uploadStart() {
  return {
    type: types.UPLOAD_START
  }
}

export function uploadComplete(xhrLoadEvent) {
  return {
    type: types.UPLOAD_COMPLETE,
    xhrLoadEvent
  }
}

export function uploadError() {
  return {
    type: types.UPLOAD_ERROR
  }
}

export function requestIRS() {
  return {
    type: types.REQUEST_IRS
  }
}

export function receiveIRS(data) {
  return {
    type: types.RECEIVE_IRS,
    msas: data.msas
  }
}

export function requestParseErrors() {
  return {
    type: types.REQUEST_PARSE_ERRORS
  }
}

export function receiveParseErrors(data) {
  return {
    type: types.RECEIVE_PARSE_ERRORS,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors
  }
}
