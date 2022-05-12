import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BaseState {
  value: string
}

const initialState: BaseState = {
  value: 'USD United States Dollar'
};

export const baseValue = createSlice({
  name: 'baseValue',
  initialState,
  reducers: {
    loadBaseValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { loadBaseValue} = baseValue.actions;

export default baseValue.reducer;
