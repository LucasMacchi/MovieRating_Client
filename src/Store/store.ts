import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer:{
        movies: moviesSlice,
        user: userSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch