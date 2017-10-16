import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { uli: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ uli: event.target.value })
  }

  handleSubmit(event) {
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
      <form className="usa-grid" id="main-content" onSubmit={this.handleSubmit}>
        <label for="uli">Enter a ULI</label>
        <input
          id="uli"
          type="text"
          value={this.state.uli}
          onChange={this.handleChange}
        />
        <input type="submit" value="Get the check digit" />
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form
