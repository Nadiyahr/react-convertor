import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { Calculator } from './components/Calculator';
import { CurrenciesList } from './components/CurrenciesList';
import { loadCurrencies } from './features/currenciesSlice';
import { useGetCurrenciesQuery } from './services/currenciesApi';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const{ data } = useGetCurrenciesQuery('list');

  const array = Object.entries(data?.currencies || {});

  useEffect(() => {
    if (data) {
      dispatch(loadCurrencies(array));
    }
  },[data]);

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
        <Route path="/" element={<Calculator/>} />
        <Route path="/list" element={<CurrenciesList/>} />
      </Routes>
    </div>
  );
};

export default App;
