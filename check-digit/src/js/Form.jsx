import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { uli: '' }

    this.handleUliChange = this.handleUliChange.bind(this)
    this.handleUliBlur = this.handleUliBlur.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    this.uliInput.focus()
  }

  handleUliChange(event) {
    this.setState({ uli: event.target.value }, () => {
      this.props.onChange()
    })
  }

  handleUliBlur(event) {
    this.props.validate(this.state.uli)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.uli)
  }

  render() {
    if (!this.props.onSubmit)
      return (
        <Alert type="error" heading="Uh oh!">
          <p>Something went wrong. Submitting a ULI won't work.</p>
        </Alert>
      )

    return (
      <form
        className="CheckDigitForm usa-grid"
        id="main-content"
        onSubmit={this.handleFormSubmit}
      >
        <label htmlFor="uli">Enter a ULI</label>
        {this.props.errors.map((error, i) => {
          return (
            <span key={i} className="usa-input-error-message" role="alert">
              {error}
            </span>
          )
        })}
        <input
          id="uli"
          ref={input => {
            this.uliInput = input
          }}
          type="text"
          value={this.state.uli}
          onChange={this.handleUliChange}
          onBlur={this.handleUliBlur}
        />
        <input type="submit" value="Get the check digit" />
      </form>
    )
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errors: PropTypes.array
}

export default Form
