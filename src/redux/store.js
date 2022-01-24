import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesReducer";
import moviesSlice from "./moviesSlice";

const rootReducer = combineReducers ({
	movies: moviesSlice
})

export const store = configureStore({
	reducer: rootReducer,
})