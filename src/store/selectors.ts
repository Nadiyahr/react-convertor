import { State } from './types';

export const getCurrenciesSelector = (state: State): Currency[] => state.currencies;

// export const getTodosSelector = (state: State): Todo[] => state.todos;
