import parseFile from '../helpers/parseFile.js'
import * as types from '../constants'

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}

export function setFilingPeriod(filingPeriod) {
  console.log('setFilingPeriod', filingPeriod)
  return {
    type: types.SET_FILING_PERIOD,
    filingPeriod: filingPeriod
  }
}

function checkErrors(file) {
  const errors = []
  if (file) {
    if (file.size === 0) {
      errors.push(
        'The file you uploaded does not contain any data. Please check your file and re-upload.'
      )
    }
    if (
      file.name
        .split('.')
        .slice(-1)[0]
        .toLowerCase() !== 'txt'
    ) {
      errors.push(
        'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
      )
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

// TODO: can update here to handle 2018!
export function triggerParse(file, filingPeriod) {
  console.log('triggerParse', filingPeriod)
  return dispatch => {
    dispatch(beginParse())

    if (filingPeriod === '2017') {
      console.log('its 2017!')
      return parseFile(file)
        .then(json => {
          dispatch(endParse(json))
        })
        .catch(err => console.error(err))
    }

    if (filingPeriod === '2018') {
      console.log('its 2018!')
      // api stuff here
      fetch('http://192.168.99.100:8082/hmda/parse', {
        method: 'POST',
        body: file
      })
        .then(response => console.log(response.json()))
        .then(success => console.log('success', success))
        .catch(error => console.log('error', error))
    }
  }
}

export function setPage(page) {
  return {
    type: types.SET_PAGE,
    page
  }
}

export function paginationFadeIn() {
  return {
    type: types.PAGINATION_FADE_IN
  }
}

export function paginationFadeOut() {
  return {
    type: types.PAGINATION_FADE_OUT
  }
}
