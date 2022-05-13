import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PrepareQueryState {
  query: string
}

const initialState: PrepareQueryState = {
  query: ''
};

export const prepareQuerygSlice = createSlice({
  name: 'prepareString',
  initialState,
  reducers: {
    loadPrepareQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    }
  }
});

export const { loadPrepareQuery } = prepareQuerygSlice.actions;

export default prepareQuerygSlice.reducer;
