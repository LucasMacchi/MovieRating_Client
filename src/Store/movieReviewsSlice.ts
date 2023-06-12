import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL

export interface review {
    id: string,
    comment: string,
    rating: number,
    movieId: string,
    profileId: string,
    likes: number,
    profileUser: string,
    likeGiven: false | true
}

export const movieReviewsSlice = createSlice({
    name: "reviews",
    initialState: [] as review[],
    reducers: {
        emptyReviews: (state) => {
            return [] as review[]
        },
        getReviews: (state, action: PayloadAction<review[]>) => {
            return action.payload
        },
        giveLike: (state, action: PayloadAction<number>) => {
            if(!state[action.payload].likeGiven) {
                state[action.payload].likes = state[action.payload].likes + 1
                
            }
            else {
                state[action.payload].likes = state[action.payload].likes - 1
            }
        },
        checkLike: (state, action: PayloadAction<number>) => {
            if(!state[action.payload].likeGiven) {
                state[action.payload].likeGiven = true
            }
            else{
                state[action.payload].likeGiven = false
            }
        },
        likeTrue: (state, action: PayloadAction<number>) => {
            state[action.payload].likeGiven = true
        }


    }
})

export const {emptyReviews, getReviews, giveLike, checkLike, likeTrue} = movieReviewsSlice.actions
export default movieReviewsSlice.reducer

export const getReviewsFromMovie = (movieId: string) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/review/"+movieId+"?type=m").then(data => {
        dispatch(getReviews(data.data))
    })
}

export const getReviewsFromUserLiked = (userId: string) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/review/"+userId+"?type=l").then(data => {
        dispatch(getReviews(data.data))
    })
}

export const getReviewsRating  = (state: review[]) => {
    let total = 0
    const reviewsTotal = state.length
    state.forEach(r => {
        total = total + r.rating
    });
    return (total / reviewsTotal)
}