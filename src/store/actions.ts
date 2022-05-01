export const SET_CURRENCIES = 'SET_CURRENCIES';

export const setCurrenciesAction = (payload: string[]) => ({
  type: SET_CURRENCIES,
  payload,
});
