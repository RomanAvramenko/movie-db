import React from './node_modules/react';
import { BrowserRouter as Router} from './node_modules/react-router-dom'


import Header from '../Header/Header';
import Catalog from '../Catalog/Catalog';
import './App.css';
import Footer from '../Footer/Footer';

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