import { createSlice } from "@reduxjs/toolkit";

interface Props {
  isAuth: boolean;
  authLoading: boolean
}

const initialState: Props = {
  isAuth: false,
  authLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload.authLoading;
    }
  },
});

export const { setAuth, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
