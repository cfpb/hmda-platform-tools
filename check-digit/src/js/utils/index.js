export const isUliValid = uli => {
  let errors = []

  if (uli.length === 0) {
    errors.push('You have to enter a ULI to get the check digit.')
  }
  /*
    maxlength for a ULI is 45 characters
    see page 20 of
    https://www.consumerfinance.gov/data-research/hmda/static/for-filers/2018/2018-HMDA-FIG.pdf
    */
  if (uli.length > 45) {
    errors.push('A ULI can only be 45 characters.')
  }
  if (!!uli.match(/[^a-zA-Z0-9]/)) {
    errors.push('A ULI can only contain alphanumeric characters.')
  }

  /*
    LEI alone is 20 characters
    Check digit is 2 characters
    uli = LEI + check digit from the institution
    so the uli.length has to be > 22
    */
  if (uli.length > 0 && uli.length <= 22) {
    const characters = uli.length === 1 ? 'character' : 'characters'
    errors.push(
      'The ULI you entered is only ' +
        uli.length +
        ' ' +
        characters +
        '. An LEI + the check digit is 22 characters in length.'
    )
  }

  return errors
}

export const isLoanIdValid = loanId => {
  let errors = []

  if (loanId.length === 0) {
    errors.push('You have to enter a loan ID to get the check digit.')
  }
  if (!!loanId.match(/[^a-zA-Z0-9]/)) {
    errors.push('A loan id can only contain alphanumeric characters.')
  }
  /*
    LEI alone is 20 characters
    loanId = LEI + loan/application id from the institution
    so the loadId.length has to be > 20
    */
  if (loanId.length > 0 && loanId.length <= 20) {
    const characters = loanId.length === 1 ? 'character' : 'characters'
    errors.push(
      'The loan id you entered is only ' +
        loanId.length +
        ' ' +
        characters +
        '. An LEI is 20 characters in length.'
    )
  }

  /*
    maxlength for a ULI is 45 characters
    a loanId is part of the ULI
    and removing the 2 characters for check digit
    the loanID.length !> 43
    */
  if (loanId.length > 43) {
    errors.push(
      'The load ID you entered is ' +
        loanId.length +
        ' characters. It can not be more than 43 characters.'
    )
  }

  return errors
}
