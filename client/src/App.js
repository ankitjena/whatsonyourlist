import React from 'react';
import { Login } from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginCallback } from './components/LoginCallback';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/redirect" component={LoginCallback} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
