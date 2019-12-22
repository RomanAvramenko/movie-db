import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'


import Header from '../header';
import Catalog from '../catalog';
import './app.css';
import Footer from '../footer';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Catalog />
        <Footer />
      </Router>
    </div>
  );
}