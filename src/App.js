import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";


function App() {
  const [{}, dispatch] = useStateValue();
  
  useEffect(() => {
    // will run once when app component loads..
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >> ', authUser);

      if(authUser) {
        // the user just logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route> 
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
