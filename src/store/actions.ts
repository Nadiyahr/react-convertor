import { ActionsTypes, SetCurrenciesAction } from './types';

export const getCurrenciesActionCreator = (payload: Currency[]): SetCurrenciesAction => ({
  type: ActionsTypes.SetCurrencies,
  payload,
});
