import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header, Footer } from 'hmda-ui'
import Home from './Home.jsx'
import CheckDigit from './check-digit/index.jsx'
import RateSpread from './rate-spread/index.jsx'
import RateSpreadRequirements from './rate-spread/Requirements.jsx'
import FFVT from './file-format-verification/index.jsx'
import LARFormatting from './lar-formatting/index.jsx'

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
        <Route path="/rate-spread" component={RateSpread} />
        <Route path="/file-format-verification" component={FFVT} />
        <Route path="/lar-formatting" component={LARFormatting} />
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
