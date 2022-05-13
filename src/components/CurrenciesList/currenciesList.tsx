import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Selects } from '../Selects';
import { useGetListRaresQuery } from '../../services/currenciesApi';
import './CurrenciesList.scss';

export const CurrenciesList: FC = () => {
  const baseValue = useSelector((state: RootState) => state.baseValue.value);
  const exchangeRates = ['USD','EUR','PLN','CZK','GBP','UAH'];
  // const query = `live?source=${baseValue.slice(0,3)}&currencies=${exchangeRates.join(',')}`;
  const query = `latest?symbols=${exchangeRates.join(',')}&base=${baseValue.slice(0,3)}`;
  const { data } = useGetListRaresQuery(query);
  const [resultRates, setResultRates] = useState<string[][]>([]);
  const combineArr = resultRates.filter(item => exchangeRates.includes(item[0].slice(-3)) && item[0].slice(-3) !== baseValue);



  const convert = (val: string) => {
    const number = 1 / Number(val);

    return number.toFixed(2);
  };

  useEffect(() => {
    if (data) {
      setResultRates(Object.entries(data.quotes));
    }
  },[baseValue]);

  return (
    <div className="List">
      <h3>List Of Exchange Rates</h3>
      <Selects type="base" />
      <ul className="list-group list-group-flush">
        {baseValue && combineArr.map((item: string[]) => (
          <li className="List__item list-group-item list-group-item-dark" key={item[0]}>
            {`1 ${item[0].slice(-3)} = ${convert(item[1])} ${baseValue.slice(0,3)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
