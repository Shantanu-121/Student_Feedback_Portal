import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import coursesReducer from "../slices/courses";
import ratingsReducer from "../slices/ratings";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  ratings: ratingsReducer,
});

export default rootReducer;
