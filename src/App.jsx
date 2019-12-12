import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import CheckDigit from './check-digit/index'
import RateSpread from './rate-spread/index'
import RateSpreadRequirements from './rate-spread/Requirements'
import RateSpreadMethodology from './rate-spread/Methodology'
import FFVT from './file-format-verification/index'
import LARFormatting from './lar-formatting/index'
import { fetchEnvConfig, findObjIndex, getEnvConfig } from './configUtils'
import { links } from './links'

import './App.css'

class App extends React.Component {
  state = { links }

  componentDidMount() {
    fetchEnvConfig()
      .then(config => this.updateFilingLink(getEnvConfig(config, window.location.host)))
      .catch(() => null)
  }

  updateFilingLink(config) {
    const idx = findObjIndex(this.state.links, 'name', 'Filing')
    if (idx > -1) {
      const links = [...this.state.links]
      links[idx].href = `/filing/${config.defaultPeriod}/`
      this.setState({ links })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header links={this.state.links} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/check-digit" component={CheckDigit} />
          <Route
            path="/rate-spread/requirements"
            component={RateSpreadRequirements}
          />
          <Route
            path="/rate-spread/methodology"
            component={RateSpreadMethodology}
          />
          <Route path="/rate-spread" component={RateSpread} />
          <Route path="/file-format-verification" component={FFVT} />
          <Route path="/lar-formatting" component={LARFormatting} />
        </Switch>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
