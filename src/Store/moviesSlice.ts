import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';


const apiURL = process.env.REACT_APP_API_URL
const size = process.env.REACT_APP_SIZE_ARRAY_MOVIES
export interface movies {
    movieId:string,
    name:string,
    imageUrl:string,
}
export interface moviesArray {
    data: movies[]
}

export const movieSlice = createSlice({
    name: "movies",
    initialState: [] as Array<movies[]>,
    reducers: {
        searchMovies: (state, action: PayloadAction<Array<movies[]>>) => {
            action.payload.forEach(element => {
                state.push(element)
            });
        },
        emptyMovies: (state) => {
            while(state.length) {
                state.pop()
            }
        },
        getMovies: (state) => {
            console.log(state.length)
        }
    },
})

export const {searchMovies, emptyMovies, getMovies} = movieSlice.actions
export default movieSlice.reducer


export const searchMoviesByName =  (name:string ) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/movie/"+name+"/"+size).then(data => {
        dispatch(searchMovies(data.data))
    })
}
