import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RverseState {
  value: boolean
}

const initialState: RverseState = {
  value: true
};

export const reverse = createSlice({
  name: 'reverse',
  initialState,
  reducers: {
    isShouldReverse: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    }
  }
});

export const { isShouldReverse} = reverse.actions;

export default reverse.reducer;
