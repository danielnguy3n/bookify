import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  duration: 0,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { setBookDuration } = bookSlice.actions;

export default bookSlice.reducer;
