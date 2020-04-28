import React, { useEffect, useReducer } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LogRocket from 'logrocket';

import history from './helper/history';
import Context from './helper/context';
import generalReducer from './utils/generalReducer';
import { Dashboard, LandingPage, Test } from './components';
import Notification from './components/shared/Notification';
import checkAuth from './helper/redirections';

LogRocket.init('6vridg/test');

const App = props => {
  const [store, dispatch] = useReducer(generalReducer, {});

  useEffect(() => {}, []);

  // console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <Router history={history}>
        <Switch>
          <Route path="/bookmark" component={LandingPage} />
          <Route
            path="/user/:id/group/:group"
            render={() =>
              checkAuth() ? <Redirect to="/bookmark" /> : <Test />
            }
          />
          <Route
            path="/user/:id"
            render={() =>
              checkAuth() ? <Redirect to="/bookmark" /> : <Dashboard />
            }
          />
          <Route
            path="/test"
            render={() =>
              checkAuth() ? <Redirect to="/bookmark" /> : <Test />
            }
          />
          <Redirect from="/" to="/bookmark" />
        </Switch>
      </Router>
      <Notification />
    </Context.Provider>
  );
};

export default App;
