
import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "movies",
    initialState: {
        name: "",
        suername: ""
    },
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload
        }
    },
})

export const {changeName} = userSlice.actions
export default userSlice.reducer