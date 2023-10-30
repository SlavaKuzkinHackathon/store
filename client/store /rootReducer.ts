import { combineReducers } from "@reduxjs/toolkit";
import {
  userReducer,
} from "./slices";

export const rootReducer = combineReducers({
  user: userReducer,
});
