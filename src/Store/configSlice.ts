import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";


export const configSlice = createSlice({
    name: "config",
    initialState: {
        isLogged: false
    },
    reducers: {
        log: (state) => {
            return {...state, isLogged: true}
        },
        logout: (state) => {
            return {...state, isLogged: false}
        }
    }
})

export const { logout, log} = configSlice.actions
export default configSlice.reducer