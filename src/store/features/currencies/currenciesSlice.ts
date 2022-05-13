import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurenciesState {
  data: string[][]
}

const initialState: CurenciesState = {
  data: []
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    loadCurrencies: (state, action: PayloadAction<string[][]>) => {
      state.data = action.payload;
    }
  }
});

export const { loadCurrencies } = currenciesSlice.actions;

export const currenciesReducer = currenciesSlice.reducer;
