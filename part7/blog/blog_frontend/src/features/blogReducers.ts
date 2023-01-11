import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BlogType, newBlogType} from "../types";
import {AppDispatch} from "../app/store";
import blogService from "../services/blogs.service";
import blogsService from "../services/blogs.service";

const initialBlog : BlogType[] = []

const blogSlice = createSlice({
    name:"blog",
    initialState:initialBlog,
    reducers:{
        setBlogs : (state, action:PayloadAction<BlogType[]>)=>{
            return action.payload
        },
        addBlog : (state,action:PayloadAction<BlogType>)=>{
            return [...state, action.payload]
        },
        updateBlog: (state,action:PayloadAction<BlogType>)=>{
            // const sameState = [...state].filter(blog =>blog.id !== action.payload.id)
            // return [...sameState, action.payload]
            return state.map(blog =>
                blog.id !== action.payload.id ? blog : action.payload
            )
        }
    }
})


export const {setBlogs,addBlog,updateBlog} = blogSlice.actions
export const initializeBlogs = ()=>{
    return async (dispatch:AppDispatch) =>{
        const blogs : BlogType[] = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addNewBlog = (newBlog: newBlogType)=>{
    return async (dispatch:AppDispatch) =>{
        const savedNewBlog = await blogsService.postNewBlog(newBlog)
        dispatch(addBlog(savedNewBlog))
        return savedNewBlog
    }
}

export const updateBolgLikes = (id: Pick<BlogType, 'id'>)=>{
    return async (dispatch: AppDispatch)=>{
        const updatedNewBlog = await blogsService.addBlogLike(id)
        dispatch(updateBlog(updatedNewBlog))
    }
}

export default blogSlice.reducer
