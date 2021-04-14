import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Map from './Map'

function App() {
  return (
    <div className="App">
      <Router >
        <Switch >
          <Route exact path="/events/0">
            <Map type="Events" level="0"/>
          </Route>
          <Route exact path="/events/2">
            <Map type="Events" level="2"/>
          </Route>
          <Route exact path="/events/3">
            <Map type="Events" level="3"/>
          </Route>
          <Route exact path="/pop/0">
            <Map type="Population" level="0"/>
          </Route>
          <Route exact path="/pop/2">
            <Map type="Population" level="2"/>
          </Route>
          <Route exact path="/pop/3">
            <Map type="Population" level="3"/>
          </Route>
          <Route exact path="/both/0">
            <Map type="Mix" level="0"/>
          </Route>
          <Route exact path="/both/2">
            <Map type="Mix" level="2"/>
          </Route>
          <Route exact path="/both/3">
            <Map type="Mix" level="3"/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
