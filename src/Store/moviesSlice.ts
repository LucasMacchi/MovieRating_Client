import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';


const apiURL = "http://localhost:3400"
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
    initialState: [] as movies[],
    reducers: {
        testUse: (state) => {
            const testMov = {
                movieId: "df",
                name: "xd",
                imageUrl: "dada"
            }
            state.push(testMov);
            console.log(state)
        },
        searchMovies: (state, action: PayloadAction<movies[]>) => {
            action.payload.forEach(element => {
                state.push(element)
            });
        },
        emptyMovies: (state) => {
            state = []
        },
        getMovies: (state) => {
            console.log(state.length)
        }
    },
})

export const {testUse, searchMovies, emptyMovies, getMovies} = movieSlice.actions
export default movieSlice.reducer


export const searchMoviesByName =  (name:string ) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/movie/"+name).then(data => {
        dispatch(searchMovies(data.data))
    })
}