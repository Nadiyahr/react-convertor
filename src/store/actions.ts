import {
  ActionsTypes, SetArrDataFilterAction, SetBaseAction, SetCurrenciesAction, SetExchangeRatesAction, SetFromAction, SetToAction,
} from './types';

export const setCurrenciesActionCreator = (payload: string[][]): SetCurrenciesAction => ({
  type: ActionsTypes.SetCurrencies,
  payload,
});

export const setFromActionCreator = (payload: string): SetFromAction => ({
  type: ActionsTypes.SetFrom,
  payload,
});

export const setToActionCreator = (payload: string): SetToAction => ({
  type: ActionsTypes.SetTo,
  payload,
});

export const setArrDataFilterActionCreator = (payload: string[][]): SetArrDataFilterAction => ({
  type: ActionsTypes.SetArrDataFilter,
  payload,
});

export const setExchangeRatesActionCreator = (payload: string[]): SetExchangeRatesAction => ({
  type: ActionsTypes.SetExchangeRates,
  payload,
});

export const SetBaseActionCreator = (payload: string): SetBaseAction => ({
  type: ActionsTypes.SetBase,
  payload,
});