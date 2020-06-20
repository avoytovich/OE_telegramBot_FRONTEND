import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createPersistedReducer from 'use-persisted-reducer';
import LogRocket from 'logrocket';

import history from './helper/history';
import Context from './helper/context';
import generalReducer from './utils/generalReducer';
import { Dashboard, LandingPage, Test } from './components';
import Notification from './components/shared/Notification';
import checkAuth from './helper/redirections';
require('./assets/images/favicon.ico');

LogRocket.init('6vridg/test');

function App(props) {
  const usePersistedReducer = createPersistedReducer('state');
  const [store, dispatch] = usePersistedReducer(generalReducer, {});

  useEffect(() => {}, []);

  // console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <Router history={history}>
        <Switch>
          <Route
            path="/user/:id"
            render={() =>
              checkAuth() ? <Redirect to="/english" /> : <Dashboard />
            }
          />
          <Route
            path="/test"
            render={() => (checkAuth() ? <Redirect to="/english" /> : <Test />)}
          />
          <Route path="/english" component={LandingPage} />
          <Redirect from="/" to="/english" />
        </Switch>
      </Router>
      <Notification />
    </Context.Provider>
  );
}

export default App;
