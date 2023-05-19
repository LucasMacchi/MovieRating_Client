import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";


export const configSlice = createSlice({
    name: "config",
    initialState: {
        loginMenu: false,
        isLogged: false
    },
    reducers: {
        loginMenu: (state) => {
            return {...state, loginMenu: !state.loginMenu}
        },
        log: (state) => {
            return {...state, isLogged: true}
        },
        logout: (state) => {
            return {...state, isLogged: false}
        }
    }
})

export const {loginMenu, logout, log} = configSlice.actions
export default configSlice.reducer