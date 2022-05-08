/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import { Exchange } from './components/Exchange';
import { CurrenciesList } from './components/ListCurr';

const App: React.FC = () => {

  return (
    <>
    <nav>
      <Link
        to="/"
        className="btn btn-pink"
        role="button"
      >
        Home
      </Link>
      <Link
        to="/list"
        className="btn btn-pink"
        role="button"
      >
        List Exchange Rates
      </Link>
    </nav>
    <Routes>
      <Route path="/list" element={<CurrenciesList/>} />
      <Route path="/" element={<Exchange/>} />
    </Routes>
    </>
  );
};

export default App;
