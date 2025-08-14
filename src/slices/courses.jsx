import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    setCourses(state, value) {
      state.courses = value.payload;
    },
  },
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
