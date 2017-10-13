import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.onChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    if (!this.props.onSubmit || !this.props.onChange) return null

    return (
      <form onSubmit={this.handleSubmit}>
        <label for="uli">Enter the ULI</label>
        <input
          id="uli"
          type="text"
          value={this.props.uli}
          onChange={this.handleChange}
        />
        <input type="submit" value="Get the check digit" />
      </form>
    )
  }
}

Form.propTypes = {
  uli: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form
