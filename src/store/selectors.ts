import { State } from './types';

export const getCurrenciesSelector = (state: State): string[][] => state.currencies;
export const getFromSlector = (state: State): string => state.fromCurr;
export const getToSelector = (state: State): string => state.toCurr;
export const getArrDataFilter = (state: State): string[][] => state.arrDataFilter;
export const grtExchangeRates = (state: State): string[] => state.exchangeRates;
export const getBase = (state: State): string => state.base;
export const getRenderOutput = (state: State): boolean => state.renderOutput;
export const getInvert = (state: State): boolean => state.invert;

