import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.apilayer.com/currency_data/';

export const currenciesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl, prepareHeaders: (headers ) => {
    headers.set('apikey', 'VrLd2rRsJm6EN0BsvafaQkLbWvU2jl91');
    
    return headers;
  }}),
  tagTypes: ['Record'],
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currencies, string>({
      query: (name) => name,
    }),
    getExchangeRates: builder.query<Result, string>({
      query: (combineStr) => combineStr,
    })
  })

});

export const { useGetCurrenciesQuery, useGetExchangeRatesQuery } = currenciesApi;
 