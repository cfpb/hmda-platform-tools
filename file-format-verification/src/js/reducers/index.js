import { combineReducers } from 'redux'
import {
  SELECT_FILE,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR,
  UPDATE_STATUS,
  REQUEST_PARSE_ERRORS,
  RECEIVE_PARSE_ERRORS
} from '../constants'

const defaultUpload = {
  uploading: false,
  file: null,
  errors: []
}

const defaultStatus = {
  code: null,
  message: ''
}

const defaultParseErrors = {
  isFetching: false,
  transmittalSheetErrors: [],
  larErrors: []
}


//empty action logger, temporary / for debugging
export const empty = (state = {}, action) => {
  return state
}

/*
 * Maintain data on the current upload
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      file: action.file,
      errors: action.errors
    }
  default:
    return state
  }
}

export const status = (state = defaultStatus, action) => {
  switch(action.type) {
    case UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}

export const parseErrors = (state = defaultParseErrors, action) => {
  switch(action.type) {
    case REQUEST_PARSE_ERRORS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_PARSE_ERRORS:
      return {
        isFetching: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors
      }

    default:
      return state
  }
}

export default combineReducers({
  empty,
  upload,
  status,
  parseErrors
})
