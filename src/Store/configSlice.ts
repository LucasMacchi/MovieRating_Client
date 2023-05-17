import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";


export const configSlice = createSlice({
    name: "config",
    initialState: {
        loginMenu: false
    },
    reducers: {
        loginMenu: (state) => {
            return {...state, loginMenu: !state.loginMenu}
        }
    }
})

export const {loginMenu} = configSlice.actions
export default configSlice.reducer