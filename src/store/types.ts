import { Action as BaseAction } from 'redux';

export interface State {
  currencies: Currency[]
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum ActionsTypes {
  SetCurrencies = 'SetCurrencies'
}

export type SetCurrenciesAction = Action<ActionsTypes.SetCurrencies, Currency[]>;

export type Actions = SetCurrenciesAction;
