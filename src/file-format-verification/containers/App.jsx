import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppHeader from '../../shared-components/AppHeader.jsx'
import Footer from '../../shared-components/Footer.jsx'

export class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="AppContainer">
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AppContainer)
