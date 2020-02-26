import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import { MainPage } from '../pages/MainPage/MainPage'
import { InfoPage } from '../pages/InfoPage/InfoPage'
import { SearchResultPage } from '../pages/SearchResultPage/SearchResultPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/result" component={SearchResultPage} />
            <Route path="/details" component={InfoPage} />
            <Redirect to={'/'} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}