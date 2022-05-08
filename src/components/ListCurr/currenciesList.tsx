/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeratesData } from '../../api';
import { getBase, getCurrenciesSelector, getRenderOutput, grtExchangeRates } from '../../store/selectors';
import './currenciesList.scss';
import { FC, useEffect } from 'react';
import { setExchangeRatesActionCreator } from '../../store/actions';
import { Search } from '../search';
import { exch } from '../../api/consts';

export const CurrenciesList: FC = () => {
  const dispatch = useDispatch();
  // const currencies = useSelector(getCurrenciesSelector);
  const exchangeArr = useSelector(grtExchangeRates);
  const baseValue = useSelector(getBase);
  // const isRenderOk = useSelector(getRenderOutput);
  const arr = Object.entries(exch);
  const combineArr = arr.filter(item => exchangeArr.includes(item[0]) && item[0] !== baseValue);

  // if ()

  useEffect(() => {
    // getExchangeratesData();
    //  .then(console.log);
      //  (exchange) => dispatch(setListExchangeActionCreator(exchange)));
  },[]);

  return (
    <div className="List">
      <h1>List Of Exchange Rates</h1>
      <Search type="base" />
      <ul>
        {combineArr.map((item: string[]) => (
          <li key={item[0]}>
            {`1 ${baseValue.slice(0.3)} = ${Number(item[1]).toFixed(2)} ${item[0]}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
