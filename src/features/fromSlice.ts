import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FromState {
  fromValue: string
}

const initialState: FromState = {
  fromValue: 'UAH Ukrainian Hryvnia'
};

export const fromSlice = createSlice({
  name: 'fromValue',
  initialState,
  reducers: {
    loadFromValue: (state, action: PayloadAction<string>) => {
      state.fromValue = action.payload;
    }
  }
});

export const { loadFromValue } = fromSlice.actions;

export default fromSlice.reducer;
