import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import { MainPage } from '../pages/MainPage/MainPage'
import { InfoPage } from '../pages/InfoPage/InfoPage'
import { SearchResultPage } from '../pages/SearchResultPage/SearchResultPage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UserPage } from '../pages/UserPage/UserPage';
import { store, persistor } from '../store/store';

export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/result" component={SearchResultPage} />
              <Route path="/details" component={InfoPage} />
              <Route path="/profile" component={UserPage} />
              <Redirect to={'/'} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}