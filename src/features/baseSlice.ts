import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BaseState {
  baseValue: string
}

const initialState: BaseState = {
  baseValue: 'USD United States Dollar'
};

export const baseValue = createSlice({
  name: 'baseValue',
  initialState,
  reducers: {
    loadBaseValue: (state, action: PayloadAction<string>) => {
      state.baseValue = action.payload;
    }
  }
});

export const { loadBaseValue} = baseValue.actions;

export default baseValue.reducer;
