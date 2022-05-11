import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToState {
  toValue: string
}

const initialState: ToState = {
  toValue: 'USD United States Dollar'
};

export const toSlice = createSlice({
  name: 'toValue',
  initialState,
  reducers: {
    loadToValue: (state, action: PayloadAction<string>) => {
      state.toValue = action.payload;
    }
  }
});

export const { loadToValue} = toSlice.actions;

export default toSlice.reducer;