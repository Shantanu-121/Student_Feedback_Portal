import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: localStorage.getItem("signupData")
    ? JSON.parse(localStorage.getItem("signupData"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
      localStorage.setItem("signupData", JSON.stringify(value.payload));
    },
    logout(state) {
      state.signupData = null;
      localStorage.removeItem("signupData");
    },
  },
});

export const { setSignupData, logout } = authSlice.actions;

export default authSlice.reducer;
