/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currenciesReducer } from '../features/currenciesSlice';
import fromReducer from '../features/fromSlice';
import toReducer from '../features/toSlice';
import filterReducer from '../features/filterSlice';
import baseReducer from '../features/baseSlice';
import renderReducer from '../features/renderSlice';
import reverseReducer from '../features/reverseSlice';
import { currenciesApi } from '../services/currenciesApi';
import prepareQueryReducer from '../features/preparedQuerySlice';




export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    fromValue: fromReducer,
    toValue: toReducer,
    filtredCurrencies: filterReducer,
    baseValue: baseReducer,
    render: renderReducer,
    reverse: reverseReducer,
    prepareString: prepareQueryReducer,
    [currenciesApi.reducerPath]: currenciesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currenciesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
