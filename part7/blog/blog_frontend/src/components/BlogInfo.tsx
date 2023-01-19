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
import {AiOutlineHeart} from "react-icons/ai";


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
        <div className={'w-96 sm:w-1/2 mx-auto mt-20 mb-8'}>
            <h1>{blogInfo.title} - {blogInfo.author}</h1>
            <div className={'my-0.5 italic underline decoration-blue-500 '}><a href={blogInfo.url}>{blogInfo.url}</a>
            </div>
            <div className={'mt-2'}>
                <span> <span className={'font-bold'}>{likes}</span> likes</span>
                <span>
                    <button className={''} id={'likeBlogButton'} onClick={() => likeHandler({id: blogInfo.id})}>
                        <AiOutlineHeart className={'text-red-400 mx-1 text-xl'}/>
                    </button>
                </span>
            </div>
            <div className={'mt-2'}>added by <span className={'italic'}>{blogInfo.user.username}</span></div>
            <hr className={'my-2'}/>
            <h2>Comments</h2>
            {/*<CommentForm  blogID={blogInfo.id}/>*/}
            {/*form*/}
                <form className={'my-4'} onSubmit={formSubmitHandler}>
                    <input
                        type={commentField.type}
                        value={commentField.value}
                        onChange={commentField.onChange}
                        placeholder={'add your comment'}
                    />
                    <button className={'bg-blue-400 hover:bg-blue-500 text-primary font-normal rounded-xl px-2'}
                            type={'submit'}>Submit
                    </button>
                </form>
            <ul className={'list-disc list-inside'}>
                {blogComments.map(comment => <li className={'my-1'} key={comment.id}>{comment.content}</li>)}
            </ul>
        </div>
    )
}
