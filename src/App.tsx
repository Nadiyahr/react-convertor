import React, { useEffect, useState } from 'react';
import { Search } from './search';
// import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

// import { getCurrenciesSelector } from './store/selectors';
// export { setCurrenciesAction} from './store/actions';
import { getExchangeRates, getJsonApiLayer } from './api';

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [selectedFrom, setSelectedFrom] = useState('UAH');
  const [selectedTo, setSelectedTo] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convert, setConvert] = useState(0);
  // const [error, setError] = useState<Error | null>(null);
  // const dispatch = useDispatch();
  // const curretcies = useSelector(getCurrenciesSelector);

  const loadCurrencies = async () => {
    const arrOfCurrencies: any = await getJsonApiLayer();

    console.log(arrOfCurrencies);

    setCurrencies(arrOfCurrencies);
  };

  const getSelectedCurr = (str: string, type: string) => {
    switch (type) {
      case 'from':
        setSelectedFrom(str);
        break;

      case 'to':
        setSelectedTo(str);
        break;

      default:
        break;
    }
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
      <Search dataSelect={currencies} setCurr={getSelectedCurr} type="from" defaultVal={selectedFrom} />
      <span
        className="d-inline-block"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-content="Invert currencies"
      >
        convert to
      </span>
      <Search dataSelect={currencies} setCurr={getSelectedCurr} type="to" defaultVal={selectedTo} />
      {/* <label htmlFor="from" className="convertor__label">
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
      </label> */}
      <button type="button" onClick={(e) => convertRes(e)}>Convert</button>
      <p>{convert}</p>
      {/* <p>{error}</p> */}
    </section>
  );
};

export default App;
