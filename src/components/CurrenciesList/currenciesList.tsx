/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Selects } from '../Selects';
import { getExchangeratesData } from '../../api';
import { loadFiltredCurrenciess } from '../../features/filterSlice';
import './CurrenciesList.scss';

export const CurrenciesList: FC = () => {
  const dispatch = useDispatch();
  const baseValue = useSelector((state: RootState) => state.baseValue.value);
  const [resultRates, setResultRates] = useState<string[][]>([]);
  const exchangeRates = ['USD','EUR','PLN','CZK','GBP','UAH'];
  const combineArr = resultRates.filter(item => exchangeRates.includes(item[0]) && item[0] !== baseValue);

  const convert = (val: string) => {
    const number = 1 / Number(val);

    return number.toFixed(2);
  };

  useEffect(() => {
    getExchangeratesData(baseValue)
      .then(data => setResultRates(Object.entries(data)));
  },[baseValue]);

  return (
    <div className="List">
      <h3>List Of Exchange Rates</h3>
      <Selects type="base" />
      <ul className="list-group list-group-flush">
        {combineArr.map((item: string[]) => (
          <li className="List__item list-group-item list-group-item-dark" key={item[0]}>
            {`1 ${item[0]} = ${convert(item[1])} ${baseValue.slice(0,3)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
