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

const App = () => {
  return (
    <React.Fragment>
      <Header />
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

export default App
