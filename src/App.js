import React from 'react';
import './App.css';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
// import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
