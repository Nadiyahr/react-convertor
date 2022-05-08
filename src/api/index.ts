/* eslint-disable @typescript-eslint/no-unused-vars */
import { arr, BASE_URL, exch, requestOptions } from "./consts";


export const getJsonApiArray = arr;
// (): Promise<string[][]> => {
//   return fetch(`${BASE_URL}/symbols`, requestOptions)
//     .then(res => res.text())
//     .then(result => JSON.parse(result))
//     .then(data => Object.entries(data.symbols));
// };

export const getExchangeRates = (amount: string, from: string, to: string) => {
  return fetch(`${BASE_URL}/convert?to=${to.slice(0,3)}&from=${from.slice(0,3)}&amount=${amount}`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result));
};

export const getExchangeratesData = exch;
// (base = 'UAH') => {
//   return fetch(`${BASE_URL}/latest?base=${base}`, requestOptions)
//     .then(res => res.text())
//     .then(result => JSON.parse(result));
// };

// fetch("https://api.apilayer.com/fixer/latest?symbols={symbols}&base={base}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//https://api.apilayer.com/exchangerates_data/{date}?symbols={symbols}&base={base}", requestOptions)

// export const getJsonApiArray = (): Promise<Currency[]> => {
//   return fetch(`${currencyHttp}/api/v7/currencies?apiKey=${apiKey}`)
//     .then(res => res.json())
//     .then(result => Object.values(result.results));
// };

// export const getExchangeRates = (from: string, to: string) => {
//   return fetch(`${currencyHttp}/api/v7/convert?q=${from}_${to},${to}_${from}&compact=ultra&apiKey=${apiKey}`)
//     .then(res => res.json())
//     .then(result => result);
// };
