import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from '../features/currenciesSlice';
import fromReducer from '../features/fromSlice';
import toReducer from '../features/toSlice';
import filterReducer from '../features/filterSlice';
import baseReducer from '../features/filterSlice';



export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    fromValue: fromReducer,
    toValue: toReducer,
    filtredCurrencies: filterReducer,
    baseValue: baseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
