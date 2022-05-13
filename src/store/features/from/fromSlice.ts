import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FromState {
  value: string
}

const initialState: FromState = {
  value: 'UAH Ukrainian Hryvnia'
};

export const fromSlice = createSlice({
  name: 'fromValue',
  initialState,
  reducers: {
    loadFromValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { loadFromValue } = fromSlice.actions;

export default fromSlice.reducer;
