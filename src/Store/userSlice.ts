import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { review } from "./movieReviewsSlice";

const apiURL = process.env.REACT_APP_API_URL

export interface Like {
    id: string,
    user_id: string, 
    review_id: string,
    createdAt: string,
}

export interface userData {
    username: string,
    id: string,
    email: string,
    dateBirth: string,
    likes: Like[],
    reviews: review[]
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        id: "",
        email: "",
        dateBirth: "",
        likes: [],
        reviews: []
    } as userData,
    reducers: {
        getUserData: (state, action: PayloadAction<userData>) => {
            return action.payload
        },
        emptyUserState: (state) => {
            return {} as userData
        },
        changeUserLocal: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }
    },
})

export const {getUserData, emptyUserState, changeUserLocal} = userSlice.actions
export default userSlice.reducer

export const loginUser = async (email: string, password: string): Promise<boolean> => {
    const response =  await (await axios.post(apiURL+"/auth/login",{"email": email,"password": password},{withCredentials:true})).data
    return response
}

export const logoutUser = async (session_id: string, dispatch: Dispatch<AnyAction>) => {
    const response =  await (await axios.delete(apiURL+"/auth/logout/"+session_id,{withCredentials:true})).data
    return response
}

export const registerUser = async (email: string, password: string, dateBirth: string, username: string ) => {
    try {
        const response = await axios.post(apiURL+"/user/create",{"email": email, "password": password, "dateofbirth": dateBirth, "username": username})
        if(response) return "User created"
        else return "error to create"
    } catch (error: any | AxiosError ) {
        if(axios.isAxiosError(error)){
            if(error.response){
                const er: string = error.response.data
                if(er.includes("Profiles_username_key")){
                    return "username"
                }
                if(er.includes("Profiles_email_key")){
                    return "email"
                }
            }
           
        }
        

    }

}

export const verifyUser = async (email: string, code: number) => {
    try {
        const response = await axios.post(apiURL+"/user/validate-user",{"email": email, "code": code})
        if(response) return true
        else return false
    } catch (error) {
        return false
    }

}

export const getUserInfo = (email: string) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/user/"+email).then(data => {
        const user: userData = {
            id: data.data.id,
            username: data.data.username,
            email: data.data.email,
            dateBirth: data.data.dateBirth,
            likes: data.data.likes,
            reviews: data.data.reviews
        }

        dispatch(getUserData(user))

    })
}

export const getUserInfoFromSession = (session_id: string) => (dispatch: Dispatch<AnyAction>) => {
    axios.get(apiURL+"/auth/"+session_id).then(data => {
        const user: userData = {
            id: data.data.id,
            username: data.data.username,
            email: data.data.email,
            dateBirth: data.data.dateBirth,
            likes: data.data.likes,
            reviews: data.data.reviews
        }
        dispatch(getUserData(user))

    })
} 

export const changeUsername = async (username:string, email: string) => {
    const data = {
        "username": username,
        "email": email
    }
    const res = axios.patch(apiURL+"/user/patch-user",data, {withCredentials: true})
    return res
}

export const createTokenSendLink = async (email: string) => {
    await axios.post(apiURL+"/user/passcode/"+email)
    console.log("Link sent")
    return true
}

export const changePassword = async (token_id: string, newPassword: string) => {
    const data = {"token_id": token_id, "newPassword": newPassword}
    const response = await axios.patch(apiURL+"/user/password",data)
    return response
}

export const postReview = async (user_id: string, movie_id: string, comment: string, rating: number) => {
    const data = {
        "user_id" : user_id,
        "movie_id" : movie_id,
        "comment" : comment,
        "rating" : rating
    }
    const response = await axios.post(apiURL+"/review/create", data)
    return response
}

export const userLike = async (user_id: string, review_id: string) => {
    const data = {
        "user_id" : user_id,
        "review_id" : review_id
    }
    const response = await axios.post(apiURL+"/user/like",data, {withCredentials: true})
    return response
}
export const userUnLike = async (user_id: string, review_id: string) => {
    const data = {
        "user_id" : user_id,
        "review_id" : review_id
    }
    const response = await axios.delete(apiURL+"/user/unlike",{withCredentials: true,data})
    return response
}