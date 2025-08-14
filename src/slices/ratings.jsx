import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: [],
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: initialState,
  reducers: {
    setRatings(state, value) {
      state.ratings = value.payload;
    },
  },
});

export const { setRatings } = ratingsSlice.actions;

export default ratingsSlice.reducer;
