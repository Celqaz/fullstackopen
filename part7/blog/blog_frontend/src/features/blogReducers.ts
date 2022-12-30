import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BlogType} from "../types";
import {AppDispatch} from "../app/store";
import blogService from "../services/blogs.service";

const initialBlog : BlogType[] = []

const blogSlice = createSlice({
    name:"blog",
    initialState:initialBlog,
    reducers:{
        setBlogs : (state, action:PayloadAction<BlogType[]>)=>{
            console.log('huihui',action.payload)
            return action.payload
        }
    }
})


export const {setBlogs} = blogSlice.actions
export const initializeBlogs = ()=>{
    console.log('initializeBlogs')
    return async (dispatch:AppDispatch) =>{
        const blogs : BlogType[] = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

// export const addNewAnecdotes = (content: Pick<AnecdoteType, "content" | "author" | "info" >) => {
//     return async (dispatch: AppDispatch) => {
//         const anecdotes = await anecdotesService.postNew(content)
//         dispatch(addAnecdote(anecdotes))
//     }
// }

export default blogSlice.reducer
