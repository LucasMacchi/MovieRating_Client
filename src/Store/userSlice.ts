import {AnyAction, Dispatch, PayloadAction, createSlice} from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { review } from "./movieReviewsSlice";
import { response } from "express";

const apiURL = process.env.REACT_APP_API_URL

export interface userData {
    username: string,
    id: string,
    email: string,
    dateBirth: string,
    likes: [],
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
        }
    },
})

export const {getUserData} = userSlice.actions
export default userSlice.reducer

export const loginUser = async (email: string, password: string): Promise<boolean> => {
    const response =  await (await axios.post(apiURL+"/auth/login",{"email": email,"password": password},{withCredentials:true})).data
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
