import { combineReducers } from 'redux'
import {
  SELECT_FILE,
  UPDATE_STATUS,
  BEGIN_PARSE,
  END_PARSE
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
  isParsing: false,
  parsed: false,
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
    case BEGIN_PARSE:
      return {
        ...state,
        isParsing: true
      }

    case END_PARSE:
      return {
        parsed: true,
        isParsing: false,
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
