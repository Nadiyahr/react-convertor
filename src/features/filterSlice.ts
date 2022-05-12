import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  array: string[][]
}

const initialState: FilterState = {
  array: []
};

export const filterSlice = createSlice({
  name: 'filtred',
  initialState,
  reducers: {
    loadFiltredCurrenciess: (state, action: PayloadAction<string[][]>) => {
      state.array = action.payload;
    }
  }
});

export const { loadFiltredCurrenciess } = filterSlice.actions;

export default filterSlice.reducer;
