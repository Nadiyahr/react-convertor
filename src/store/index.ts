import { createStore, Reducer } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { State, Actions, ActionsTypes } from './types';
// import { arrOfCurrencies } from '../api';
// import { SET_CURRENCIES } from './actions';

const initialState: State = {
  currencies: [],
};

const reducer: Reducer<State, Actions> = (state = initialState, action): State => {
  switch (action.type) {
    case ActionsTypes.SetCurrencies:
      return {
        ...state,
        currencies: [...state.currencies, ...action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, composeWithDevTools());
