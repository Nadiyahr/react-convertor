import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBase, grtExchangeRates } from '../../store/selectors';
import { Search } from '../search';
import { getExchangeratesData } from '../../api';
import './currenciesList.scss';

export const CurrenciesList: FC = () => {
  const exchangeArr = useSelector(grtExchangeRates);
  const baseValue = useSelector(getBase);
  const [resultRates, setResultRates] = useState<string[][]>([]);
  const combineArr = resultRates.filter(item => exchangeArr.includes(item[0]) && item[0] !== baseValue);

  const convert = (val: string) => {
    const number = 1 / Number(val);

    return number.toFixed(2);
  };

  useEffect(() => {
    getExchangeratesData(baseValue).then(data => setResultRates(Object.entries(data)));
  },[baseValue]);

  return (
    <div className="List">
      <h3>List Of Exchange Rates</h3>
      <Search type="base" />
      <ul className="list-group list-group-flush">
        {combineArr.map((item: string[]) => (
          <li className="List__item list-group-item list-group-item-dark" key={item[0]}>
            {`1 ${item[0]} = ${convert(item[1])} ${baseValue.slice(0.3)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
