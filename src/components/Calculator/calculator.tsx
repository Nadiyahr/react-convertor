import React, { useEffect, useState } from 'react';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromValue } from '../../features/fromSlice';
import { loadToValue } from '../../features/toSlice';
import { isShouldReverse } from '../../features/reverseSlice';
import { isShouldRender } from '../../features/renderSlice';
import { Selects } from '../Selects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import './Calculator.scss';
import { loadPrepareQuery } from '../../features/preparedQuerySlice';
import { Result } from '../Result';

export const Calculator = () => {
  const dispatch = useDispatch();
  const currencies = useSelector((state: RootState) => state.currencies.data);
  const selectedFrom = useSelector((state: RootState) => state.fromValue.value);
  const selectedTo = useSelector((state: RootState) => state.toValue.value);
  const [amount, setAmount] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = event.target;


    switch (name) {
      case 'selectedFrom':
        dispatch(loadFromValue(value));
        break;

      case 'selectedTo':
        dispatch(loadToValue(value));
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

    dispatch(loadFromValue(selectedTo));
    dispatch(loadToValue(temoraryFtom));
    dispatch(isShouldReverse(true));
    dispatch(isShouldRender(false));
    convertRes();
  };

  const validator = (enterValue: string) => {
    if (!isNaN(+enterValue)) {
      return true;
    }

    const RegExp = /^\d+ [A-Z,a-z]{3} in [A-Z,a-z]{3}/g;

    return RegExp.test(enterValue);
  };

  const convertRes = async () => {
    if (validator(amount)) {
  
      if (isNaN(+amount)) {
        const newFrom = amount.replace(/\d/g, '').trim().slice(0,3).toUpperCase();
        const newTo = amount.replace(/\d/g, '').trim().slice(-3).toUpperCase();

        dispatch(loadFromValue(currencies.find(x => x[0] === newFrom)!.join(' ')));
        dispatch(loadToValue(currencies.find(x => x[0] === newTo)!.join(' ')));
      }

      const paramsQuery = {
        amountFrom: amount.replace(/\D/g, ''),
        from: selectedFrom.slice(0,3),
        to: selectedTo.slice(0,3)
      };

      const preparedQuery = `/convert?to=${paramsQuery.to}&from=${paramsQuery.from}&amount=${paramsQuery.amountFrom}`;

      dispatch(loadPrepareQuery(preparedQuery));
    }
  };

  useEffect(() => {
    dispatch(isShouldRender(false));
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
        <Selects
          type="from"
        />
        <button
          className="convertor__invert btn btn-primary"
          type="button"
          onClick={invertCurrencies}
        >
          <FontAwesomeIcon icon={faRotate} />
        </button>
        <Selects
          type="to"
        />
      </div>
      <div className="mb-3">
        <button
          type="button"
          onClick={() => convertRes()}
          className="btn btn-primary w-100"
        >
          Convert
        </button>
      </div>
      <div className="convertor__inner">
        <Result />
      </div>
    </form>
  );
};
