import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurenciesState {
  currencies: string[][]
}

const initialState: CurenciesState = {
  currencies: []
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    loadCurrencies: (state, action: PayloadAction<string[][]>) => {
      [...state.currencies, ...action.payload];
    }
  }
});

export const { loadCurrencies } = currenciesSlice.actions;

export default currenciesSlice.reducer;
