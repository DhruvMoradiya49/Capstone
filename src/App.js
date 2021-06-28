import React from 'react';
import './App.css';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route> 
          <Route path="/">
            <Home />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
