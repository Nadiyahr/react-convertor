import { createStore, Reducer } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { State, Actions, ActionsTypes } from './types';

const initialState: State = {
  currencies: [],
  fromCurr: 'UAH Ukrainian Hryvnia',
  toCurr: 'USD United States Dollar',
  arrDataFilter: [],
  exchangeRates: ['USD','EUR','PLN','CZK','GBP','UAH'],
  base: 'UAH',
  renderOutput: true,
  reverse: false,
};

const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case ActionsTypes.SetCurrencies:
      return {
        ...state,
        currencies: [...state.currencies, ...action.payload],
      };

    case ActionsTypes.SetFrom:
      return {
        ...state,
        fromCurr: action.payload,
      };

    case ActionsTypes.SetTo:
      return {
        ...state,
        toCurr: action.payload,
      };

    case ActionsTypes.SetArrDataFilter:
      return {
        ...state,
        arrDataFilter: action.payload,
      };

    case ActionsTypes.SetExchangeRates:
      return {
        ...state,
        exchangeRates: [...state.exchangeRates, ...action.payload],
      };

    case ActionsTypes.SetBase:
      return {
        ...state,
        base: action.payload,
      };

    case ActionsTypes.SetRenderOutput:
      return {
        ...state,
        renderOutput: action.payload,
      };

    case ActionsTypes.SetReverse:
      return {
        ...state,
        reverse: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());
