import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import { Exchange } from './components/Exchange';
import { CurrenciesList } from './components/ListCurr';

const App: React.FC = () => {

  return (
    <div className="app">
      <nav className="app__nav">
        <Link
          to="/"
          className="app__btn btn btn-pink"
          role="button"
        >
          Calculator
        </Link>
        <Link
          to="/list"
          className="app__btn btn btn-pink"
          role="button"
        >
          List Exchange Rates
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Exchange/>} />
        <Route path="/list" element={<CurrenciesList/>} />
      </Routes>
    </div>
  );
};

export default App;
