/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL, requestOptions } from "./consts";


export const getJsonApiArray = (): Promise<string[][]> => {
  return fetch(`${BASE_URL}/symbols`, requestOptions)
    .then(res => res.text())
    .then(result => JSON.parse(result))
    .then(data => Object.entries(data.symbols));
};

export const getExchangeRates = (amount: string, from: string, to: string) => {
  return fetch(`${BASE_URL}/convert?to=${to.slice(0,3)}&from=${from.slice(0,3)}&amount=${amount}`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result));
};

export const getExchangeratesData = (base = 'UAH'): Promise<Curr> => {
  return fetch(`${BASE_URL}/latest?base=${base.slice(0,3)}`, requestOptions)
    .then(res => res.text())
    .then(result => JSON.parse(result))
    .then(data => data.rates);
};
