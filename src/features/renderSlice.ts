import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RenderState {
  render: boolean
}

const initialState: RenderState = {
  render: true
};

export const render = createSlice({
  name: 'render',
  initialState,
  reducers: {
    isShouldRender: (state, action: PayloadAction<boolean>) => {
      state.render = action.payload;
    }
  }
});

export const { isShouldRender} = render.actions;

export default render.reducer;
