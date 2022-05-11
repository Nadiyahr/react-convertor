import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  filtredCurrencies: string[][]
}

const initialState: FilterState = {
  filtredCurrencies: []
};

export const filterSlice = createSlice({
  name: 'filtred',
  initialState,
  reducers: {
    loadFiltredCurrenciess: (state, action: PayloadAction<string[][]>) => {
      [...state.filtredCurrencies, ...action.payload];
    }
  }
});

export const { loadFiltredCurrenciess } = filterSlice.actions;

export default filterSlice.reducer;
