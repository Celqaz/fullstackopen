import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {credentialsType, UserType} from "../types";
import {AppDispatch} from "../app/store";
import blogService from "../services/blogs.service";
import loginService from "../services/login.service";

const initialUser: UserType = {
    id: "",
    username: "",
    blogs:[]
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            return action.payload
        },
        resetUser: () => initialUser
    }
})

export const {resetUser, setUser} = userSlice.actions

export const initializeUser = ()=>{
    return (dispatch: AppDispatch) =>{
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
            console.log('User Get')
            // noteService.setToken(user.token)
        }
    }
}

export const userLogin = (credentials: credentialsType) =>{
    return async (dispatch:AppDispatch) =>{
        const user = await loginService.login(credentials)
        dispatch(setUser(user))
        return user
    }
}

export default userSlice.reducer
