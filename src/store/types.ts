import { Action as BaseAction } from 'redux';

export interface State {
  currencies: string[][]
  // currencies: Currency[],
  fromCurr: string,
  toCurr: string,
  arrDataFilter: string[][],
  exchangeRates: string[],
  base: string,
  renderOutput: boolean,
  invert: boolean,
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsTypes {
  SetCurrencies = 'SetCurrencies',
  SetFrom = 'SetFrom',
  SetTo = 'SetTo',
  SetArrDataFilter = 'SetFilter',
  SetExchangeRates = 'SetExchangeRates',
  SetBase = 'SetBase',
  SetRenderOutput = 'SetRenderOutput',
  SetInvert = 'SetInvert',
}

export type SetCurrenciesAction = Action<ActionsTypes.SetCurrencies, string[][]>;
export type SetFromAction = Action<ActionsTypes.SetFrom, string>;
export type SetToAction = Action<ActionsTypes.SetTo, string>;
export type SetArrDataFilterAction = Action<ActionsTypes.SetArrDataFilter, string[][]>;
export type SetExchangeRatesAction = Action<ActionsTypes.SetExchangeRates, string[]>;
export type SetBaseAction = Action<ActionsTypes.SetBase, string>;
export type SetRenderOutputAction = Action<ActionsTypes.SetRenderOutput, boolean>;
export type SetInvertAction = Action<ActionsTypes.SetInvert, boolean>;


export type Actions = SetCurrenciesAction
  | SetFromAction
  | SetToAction
  | SetArrDataFilterAction
  | SetExchangeRatesAction
  | SetBaseAction
  | SetRenderOutputAction
  | SetInvertAction;
