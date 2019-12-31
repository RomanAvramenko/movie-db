import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import { MainPage } from '../pages/MainPage/MainPage'
import { InfoPage } from '../pages/InfoPage/InfoPage'
import { SearchResultPage } from '../pages/SearchResultPage/SearchResultPage';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/details" component={InfoPage} />
          <Route path="/search-result" component={SearchResultPage} />
          <Redirect to={'/'} />
        </Switch>
      </Router>
    </div>
  );
}