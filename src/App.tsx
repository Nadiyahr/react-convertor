import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

// import { getCurrenciesSelector } from './store/selectors';
// export { setCurrenciesAction} from './store/actions';
import { getExchangeRates, getJsonApi } from './api';

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  // const [from, setFrom] = useState<string[]>([]);
  // const [to, setTo] = useState<string[]>([]);
  const [selectedFrom, setSelectedFrom] = useState('UAH');
  const [selectedTo, setSelectedTo] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convert, setConvert] = useState(0);
  // const dispatch = useDispatch();
  // const curretcies = useSelector(getCurrenciesSelector);

  const loadCurrencies = async () => {
    const arrOfCurrencies: Currencies = await getJsonApi();

    // console.log(Object.keys(arrOfCurrencies.symbols));
    setCurrencies(Object.keys(arrOfCurrencies.symbols));
    // setTo(Object.keys(arrOfCurrencies.symbols));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = event.target;

    console.log(name, value); // eslint-disable-line no-console

    switch (name) {
      case 'selectedFrom':
        setSelectedFrom(value);
        break;

      case 'selectedTo':
        setSelectedTo(value);
        break;

      case 'amount':
        setAmount(value);
        break;

      default:
        break;
    }
  };

  const convertRes = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const getExchange: Result = await getExchangeRates(amount, selectedFrom, selectedTo);

    setConvert(getExchange.result);
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  return (
    <section className="convertor">
      <h1 className="convertor__title">Convertor</h1>
      <label htmlFor="amount">
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="from" className="convertor__label">
        Select a value from
        <select
          name="selectedFrom"
          value={selectedFrom}
          onChange={(e) => handleChange(e)}
        >
          {currencies.map((curr) => (
            <option key={curr}>{curr}</option>
          ))}
        </select>
      </label>
      <label htmlFor="to" className="convertor__label">
        Select a value to
        <select
          name="selectedTo"
          value={selectedTo}
          onChange={(e) => handleChange(e)}
        >
          {currencies.map((curr) => (
            <option key={curr}>{curr}</option>
          ))}
        </select>
      </label>
      <button type="button" onClick={(e) => convertRes(e)}>Convert</button>
      <p>{convert}</p>
    </section>
  );
};

export default App;
