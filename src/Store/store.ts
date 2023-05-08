import { configureStore, combineReducers } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import userSlice from "./userSlice";
import detailSlice  from "./movieDetailsSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

const reducersCombined = combineReducers({
    moviesSlice,
    userSlice,
    detailSlice
})

const persistConfig = {
    key: "root",
    storage: storage
}
const persistedReducer = persistReducer(persistConfig, reducersCombined)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch