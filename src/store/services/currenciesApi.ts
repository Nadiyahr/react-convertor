import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'kK7ypooCotCX37FG5EByLS8tADr3v9Xj';
// const apiKey = 'VrLd2rRsJm6EN0BsvafaQkLbWvU2jl91';
// const apiKey = 'QcNkBWCbg01lRNKI6H64YumEVU0shxS7';

const baseUrl = 'https://api.apilayer.com/exchangerates_data/';
// const baseUrl = 'https://api.apilayer.com/currency_data/';
// const baseUrl = 'https://api.apilayer.com/fixer/';

export const currenciesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl, prepareHeaders: (headers ) => {
    headers.set('apikey', apiKey);
    return headers;
  }}),
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currencies, string>({
      query: (name) => name,
    }),
    getExchangeRates: builder.query<Result, string>({
      query: (combineStr) => combineStr,
    }),
    getListRates: builder.query<Curr, string>({
      query: (baseQuery) => baseQuery
    })
  })
});

export const { useGetCurrenciesQuery, useGetExchangeRatesQuery, useGetListRatesQuery } = currenciesApi;
 