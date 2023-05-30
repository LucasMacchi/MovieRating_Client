import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL

export interface details {
    id: string,
    name: string,
    synopsis: string,
    directedBy: string,
    releaseDate: string,
    posterImage: string,
    trailer: string
}

export const detailSlice = createSlice({
    name: "details",
    initialState: {} as details,
    reducers: {
        emptyDetails: (state) => {
           return {} as details
        },
        setDetails: (state, action: PayloadAction<details>) => {
            return action.payload

        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        }
    }
})

export const {emptyDetails, setDetails, setId} = detailSlice.actions
export default detailSlice.reducer

export const searchMovieDetail = (movieId: string) => (dispatch: Dispatch<AnyAction>) => {
    axios.post(apiURL+"/movie/detail",{"id": movieId}).then(data => {
        dispatch(setDetails(data.data))
        dispatch(setId(movieId))
    })
}