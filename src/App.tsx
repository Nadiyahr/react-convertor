import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { getJsonApiArray } from './api';
import { Exchange } from './components/Calculator';
import { CurrenciesList } from './components/CurrenciesList';
import { setCurrenciesActionCreator } from './store/actions';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getJsonApiArray()
        .then((curr) => dispatch(setCurrenciesActionCreator(curr)));

  },[]);

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
