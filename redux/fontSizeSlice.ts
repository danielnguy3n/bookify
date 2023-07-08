import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  fontSize: number;
}

const initialState: CounterState = {
  fontSize: 16,
};

export const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFontSize } = fontSizeSlice.actions;

export default fontSizeSlice.reducer;
