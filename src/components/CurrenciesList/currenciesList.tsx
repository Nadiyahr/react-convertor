import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Selects } from '../Selects';
import { useGetListRatesQuery } from '../../store/services/currenciesApi';
import './CurrenciesList.scss';

export const CurrenciesList: FC = () => {
  const baseValue = useSelector((state: RootState) => state.baseValue.value);
  const exchangeRates = ['USD','EUR','PLN','CZK','GBP','UAH'];
  const query = `latest?symbols=${exchangeRates.join(',')}&base=${baseValue}`;
  const { data } = useGetListRatesQuery(query);
  const [resultRates, setResultRates] = useState<string[][]>([]);
  const combineArr = resultRates.filter(item => exchangeRates.includes(item[0]) && item[0] !== baseValue);

  const convert = (val: string) => {
    const number = 1 / Number(val);

    return number.toFixed(2);
  };

  useEffect(() => {
    setResultRates(Object.entries(data?.rates || {}));
  },[baseValue, data]);

  return (
    <div className="List">
      <h3>List Of Exchange Rates</h3>
      <Selects type="base" />
      <ul className="list-group list-group-flush">
        {resultRates.length > 0 && combineArr.map((item: string[]) => (
          <li className="List__item list-group-item list-group-item-dark" key={item[0]}>
            {`1 ${item[0]} = ${convert(item[1])} ${baseValue}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
