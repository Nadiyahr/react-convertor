import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToState {
  value: string
}

const initialState: ToState = {
  value: 'USD United States Dollar'
};

export const toSlice = createSlice({
  name: 'toValue',
  initialState,
  reducers: {
    loadToValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { loadToValue} = toSlice.actions;

export default toSlice.reducer;