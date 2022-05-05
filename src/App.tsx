import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search } from './search';
import './App.scss';
import { getExchangeRates } from './api';
import { getCurrenciesSelector } from './store/selectors';

const App: React.FC = () => {
  const currencies = useSelector(getCurrenciesSelector);
  // const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedFrom, setSelectedFrom] = useState('UAH');
  const [selectedTo, setSelectedTo] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertAmount, setConvertAmount] = useState(0);
  // const [error, setError] = useState<Error | null>(null);
  // const dispatch = useDispatch();
  // const curretcies = useSelector(getCurrenciesSelector);

  // const loadCurrencies = async () => {
  //   const arrOfCurrencies: Currency[] = await getJsonApiArray();

  //   console.log(arrOfCurrencies);

  // setCurrencies(arrOfCurrencies);
  // };

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

  const invertCurrencies = () => {
    const from = selectedFrom;
    const oldAmount = amount;

    setSelectedFrom(selectedTo);
    setSelectedTo(from);
    setAmount(convertAmount.toString());
    setConvertAmount(+oldAmount);
  };

  const convertRes = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const getExchange: Curr = await getExchangeRates(selectedFrom, selectedTo);
    const exchange = +Object.values(getExchange)[0];
    const result = +(exchange * +amount).toFixed(2);

    setConvertAmount(result);
  };

  // useEffect(() => {
  //   loadCurrencies();
  // }, []);

  return (
    <>
      <form className="convertor">
        <h1 className="convertor__title">Currency Convertor</h1>
        <div className="convertor__conteiner mb-3">
          <label htmlFor="amount" className="form-label">
            Enter Ammount
          </label>
          <input
            className="convertor__input"
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="convertor__selectors">
          <Search
            arrayDataForSelect={currencies}
            setCurrentValue={getSelectedCurr}
            type="from"
            currentValue={selectedFrom}
            changeCurrentValue={setSelectedFrom}
          />
          <button
            className="convertor__invert btn btn-primary w-25"
            type="button"
            onClick={invertCurrencies}
          >
            <i className="fas fa-exchange-alt"></i>
          </button>
          <Search
            arrayDataForSelect={currencies}
            setCurrentValue={getSelectedCurr}
            type="to"
            currentValue={selectedTo}
            changeCurrentValue={setSelectedTo}
          />
        </div>
        <h4 className="convertor__p">{`${amount} ${selectedFrom} = ${convertAmount} ${selectedTo}`}</h4>
        <div className="mb-3">
          <button
            type="button"
            onClick={(e) => convertRes(e)}
            className="btn btn-primary w-100"
          >
            Convert
          </button>
        </div>
      </form>
    </>
  );
};

export default App;
