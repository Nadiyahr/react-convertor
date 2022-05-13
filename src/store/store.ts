import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currenciesReducer } from './features/currencies/currenciesSlice';
import fromReducer from './features/from/fromSlice';
import toReducer from './features/to/toSlice';
import filterReducer from './features/filter/filterSlice';
import baseReducer from './features/base/baseSlice';
import renderReducer from './features/render/renderSlice';
import reverseReducer from './features/reverse/reverseSlice';
import { currenciesApi } from './services/currenciesApi';
import prepareQueryReducer from './features/preparedQuery/preparedQuerySlice';

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
