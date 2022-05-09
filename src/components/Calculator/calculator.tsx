import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeRates } from '../../api';
import {
  SetReverseActionCreator,
  setFromActionCreator,
  SetRenderOutputActionCreator,
  setToActionCreator,
} from '../../store/actions';
import {
  getCurrenciesSelector,
  getFromSlector,
  getRenderOutput,
  getToSelector,
} from '../../store/selectors';
import { Search } from '../Selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import './calculator.scss';

export const Exchange = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(getCurrenciesSelector);
  const selectedFrom = useSelector(getFromSlector);
  const selectedTo = useSelector(getToSelector);
  const renderResult = useSelector(getRenderOutput);
  const [amount, setAmount] = useState('');
  const [convertAmount, setConvertAmount] = useState(0);
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'selectedFrom':
        dispatch(setFromActionCreator(value));
        break;

      case 'selectedTo':
        dispatch(setToActionCreator(value));
        break;

      case 'amount':
        setAmount(value);
        break;

      default:
        break;
    }
  };

  const invertCurrencies = () => {
    const temoraryFtom = selectedFrom;

    dispatch(setFromActionCreator(selectedTo));
    dispatch(setToActionCreator(temoraryFtom));
    dispatch(SetReverseActionCreator(true));
  };

  const validator = (enterValue: string) => {
    if (!isNaN(+enterValue)) {
      return true;
    }

    const RegExp = /^\d+ [A-Z,a-z]{3} in [A-Z,a-z]{3}/g;

    return RegExp.test(enterValue);
  };

  const convertRes = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (validator(amount)) {
      if (isNaN(+amount)) {
        const newFrom = amount.replace(/\d/g, '').trim().slice(0,3).toUpperCase();
        const newTo = amount.replace(/\d/g, '').trim().slice(-3).toUpperCase();
        dispatch(setFromActionCreator(currencies.find(x => x[0] === newFrom)!.join(' ')));
        dispatch(setToActionCreator(currencies.find(x => x[0] === newTo)!.join(' ')));
      }

      const getExchange: Result = await getExchangeRates(amount.replace(/\D/g, ''), selectedFrom.slice(0,3), selectedTo.slice(0,3));
      const result = getExchange.result.toFixed(2);

      dispatch(SetRenderOutputActionCreator(true));

      return setConvertAmount(+result);
    }
  };

  useEffect(() => {

    dispatch(SetRenderOutputActionCreator(false));
  }, []);

  return (
    <form className="convertor">
      <h3 className="convertor__title">Currency Convertor</h3>
      <div className="convertor__conteiner mb-3">
        <label htmlFor="amount" className="form-label">
          Enter Ammount
        </label>
        <input
          placeholder="Example: 100 uah in usd or 100"
          className="convertor__input"
          type="text"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="convertor__selectors">
        <Search
          type="from"
        />
        <button
          className="convertor__invert btn btn-primary"
          type="button"
          onClick={invertCurrencies}
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
        <Search
          type="to"
        />
      </div>
      <div className="mb-3">
        <button
          type="button"
          onClick={(e) => convertRes(e)}
          className="btn btn-primary w-100"
        >
          Convert
        </button>
      </div>
      <div className="convertor__inner">
        <h4>
          {renderResult
          && `${amount} ${selectedFrom.slice(0,3)} = ${convertAmount} ${selectedTo.slice(0,3)}`}
        </h4>
      </div>
    </form>
  );
};
