import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/login';
import ProjectList from './components/project-list';


const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </Route>
        <PrivateRoute
          path="/project-list"
          component={ProjectList}
          isLoggedIn={isLoggedIn}
        />
      </Switch>
    </Router>
  );
}

export default App;
