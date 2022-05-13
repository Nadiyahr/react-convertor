import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { isShouldRender } from '../../store/features/render/renderSlice';
import { useGetExchangeRatesQuery } from '../../store/services/currenciesApi';

export const Result: FC = () => {
  const dispatch = useDispatch();
  const render = useSelector((state: RootState) => state.render.value);
  const query = useSelector((state: RootState) => state.prepareString.query);
  const { data } = useGetExchangeRatesQuery(query);

  useEffect(() => {
    dispatch(isShouldRender(true));
  },[query]);

  return (
    <h4>
      {data && render &&
       `${data.query.amount} ${data.query.from} = ${data.result.toFixed(2)} ${data.query.to}`
      }
    </h4>
  );
};
