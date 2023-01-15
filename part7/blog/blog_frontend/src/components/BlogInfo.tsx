import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import blogsService from "../services/blogs.service";
import {BlogCommentType, BlogType, CommentType, MessageType} from "../types";
import {updateBolgLikes} from "../features/blogReducers";
import {useAppDispatch} from "../app/hooks";
import {AxiosError} from "axios";
import commentServices from "../services/comment.service";
import {useField} from "../hooks";
import {displayNotification} from "../features/notificatonReducers";

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
    const [blogInfo, setBlogInfo] = useState<BlogType>()
    const commentField = useField('text')
    const [blogComments, setBlogComments] = useState<BlogCommentType[]>([])
    const {id} = useParams()
    const [likes, setLikes] = useState<number>(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (id) {
            blogsService.getBlogByID(id)
                .then((data: BlogType) => {
                    setBlogInfo(data)
                    setLikes(data.likes)
                    setBlogComments(data.comments)
                })
        }
    }, [id])
    // add like function
    const likeHandler = async (id: Pick<BlogType, 'id'>) => {
        try {
            await dispatch(updateBolgLikes(id))
            setLikes(likes + 1)
        } catch (error) {
            errorHandler(error)
        }
    }


    if (!blogInfo) {
        return <div></div>
    }

    // setBlogComments(blogInfo.comments)
    // form

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if (commentField.value) {
            const newComment: CommentType = {
                content: commentField.value,
                blogID: blogInfo.id
            }
            try {
                const savedComment: BlogCommentType = await commentServices.postNewComment(newComment)
                setBlogComments([...blogComments, savedComment])
                commentField.clearValue()
            } catch (error) {
                if (error instanceof AxiosError) {
                    // setMessageObj({ type: MessageType.Failure, message: error.response?.data.error })
                    dispatch(displayNotification({type: MessageType.Failure, message: error.response?.data.error}))
                } else if (error instanceof Error) {
                    // setMessageObj({ type: MessageType.Failure, message: error.message })
                    dispatch(displayNotification({type: MessageType.Failure, message: error.message}))
                }
            }
        } else {
            dispatch(displayNotification({type: MessageType.Failure, message: "The content of comment is required."}))
        }
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
            <h3>Comments</h3>
            {/*<CommentForm  blogID={blogInfo.id}/>*/}
            {/*form*/}
            <form onSubmit={formSubmitHandler}>
                <input
                    type={commentField.type}
                    value={commentField.value}
                    onChange={commentField.onChange}
                />
                <button type={'submit'}>Submit</button>
            </form>
            <ul>
                {blogComments.map(comment => <li key={comment.id}>{comment.content}</li>)}
            </ul>
        </div>
    )
}
