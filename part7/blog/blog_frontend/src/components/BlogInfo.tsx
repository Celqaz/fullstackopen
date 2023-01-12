import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import blogsService from "../services/blogs.service";
import {BlogType} from "../types";
import {updateBolgLikes} from "../features/blogReducers";
import {useAppDispatch} from "../app/hooks";
import {AxiosError} from "axios";

function errorHandler(error: unknown) {
    if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
    } else if (error instanceof Error) {
        console.log(error.message)
    } else {
        console.log('something wrong')
    }
}

export default function BlogInfo() {
    const {id} = useParams()
    const [blogInfo, setBlogInfo] = useState<BlogType>()
    const [likes, setLikes] = useState<number>(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (id) {
            blogsService.getBlogByID(id)
                .then((data : BlogType) => {
                    setBlogInfo(data)
                    setLikes(data.likes)
                })
        }
    }, [id])
    // add like function
    const likeHandler = async (id: Pick<BlogType, 'id'>) => {
        try {
            await dispatch(updateBolgLikes(id))
            // const updatedBlog = await blogsService.addBlogLike(id)
            // awesome
            // setBlogs(blogs.map(blog => blog.id === id.id ? {...blog, likes: blog.likes + 1} : blog))
            // setBlogs(blogs.map(blog => blog.id === id.id ? updatedBlog : blog))
            setLikes( likes + 1)
        } catch (error) {
            errorHandler(error)
        }
    }

    if (!blogInfo) {
        return <div></div>
    }


    return (
        <div>
            <h1>{blogInfo.title} {blogInfo.author}</h1>
            <div><a href={blogInfo.url}>{blogInfo.url}</a></div>
            <div>
                {likes} likes
                <span>
                    <button id={'likeBlogButton'} onClick={() => likeHandler({id: blogInfo.id})}>like</button>
                </span>
            </div>
            <div>added by {blogInfo.user.username}</div>
        </div>
    )
}
