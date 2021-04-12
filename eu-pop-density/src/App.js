import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Nuts from './Nuts.js'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch >
          <Route exact path="/nuts/0">
            <Nuts id="0"/>
          </Route>
          <Route exact path="/nuts/2">
            <Nuts id="2"/>
          </Route>
          <Route exact path="/nuts/3">
            <Nuts id="3"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
