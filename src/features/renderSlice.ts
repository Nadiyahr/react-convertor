import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RenderState {
  value: boolean
}

const initialState: RenderState = {
  value: true
};

export const render = createSlice({
  name: 'render',
  initialState,
  reducers: {
    isShouldRender: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    }
  }
});

export const { isShouldRender} = render.actions;

export default render.reducer;
