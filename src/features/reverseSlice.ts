import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RverseState {
  reverse: boolean
}

const initialState: RverseState = {
  reverse: true
};

export const reverse = createSlice({
  name: 'reverse',
  initialState,
  reducers: {
    isShouldReverse: (state, action: PayloadAction<boolean>) => {
      state.reverse = action.payload;
    }
  }
});

export const { isShouldReverse} = reverse.actions;

export default reverse.reducer;
