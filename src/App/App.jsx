import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import { MainPage } from '../pages/MainPage/MainPage'
import { InfoPage } from '../pages/InfoPage/InfoPage'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <MainPage />
        </Switch>
      </Router>
    </div>
  );
}