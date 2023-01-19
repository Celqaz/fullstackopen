import React, {useState} from 'react'
import {MessageType, newBlogType} from '../types'
import {AxiosError} from 'axios'
import {useAppDispatch} from "../app/hooks";
import {displayNotification} from "../features/notificatonReducers";
import {addNewBlog} from "../features/blogReducers";

interface BlogFormProps {
    // blogs: BlogType[]
    // setBlogs: React.Dispatch<BlogType[]>
    // setMessageObj: React.Dispatch<React.SetStateAction<TempMessageProps | null>>
    blogFormRef: React.MutableRefObject<{ toggleVisibility: () => void } | undefined>
}

const BlogForm = ({blogFormRef}: BlogFormProps): JSX.Element => {
    const [newBlog, setNewBlog] = useState<newBlogType>({title: '', url: '', author: ''})
    // redux notification
    const dispatch = useAppDispatch()

    const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        switch (type) {
            case 'title':
                setNewBlog({...newBlog, 'title': event.target.value})
                break
            case 'author':
                setNewBlog({...newBlog, 'author': event.target.value})
                break
            case 'url':
                setNewBlog({...newBlog, 'url': event.target.value})
                break
            default:
                throw new Error('invalid input type, please try again')
        }
    }
    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newBlog.title && newBlog.author && newBlog.url) {
            try {
                const savedNewBlog = await dispatch(addNewBlog(newBlog))
                dispatch(displayNotification({
                    message: `a new blog ${savedNewBlog.title} by ${savedNewBlog.author} added`
                }))
                setNewBlog({title: '', author: '', url: ''})
                // useRef
                blogFormRef.current?.toggleVisibility()
                // FormRef.current.toggleVisibility()
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
            console.log('fill the empty')
        }
    }
    return (
        <fieldset className={'w-58'}>
            <h2 className={'font-semibold text-lg my-2'}>Create New Blog</h2>
            <div className={''}>
                <form className={'inline-block'} onSubmit={formSubmitHandler}>
                    <div className={''}>
                        <label className={'block mt-4 mb-2'}>
                            <span className={'w-14 inline-block font-semibold'}>title:</span>
                            <input className={'w-44'} id={'title_input'} type={'text'} value={newBlog?.title}
                                   onChange={(event) => formChangeHandler(event, 'title')}/>
                        </label>
                        <label className={'block mb-2'}>
                            <span className={'w-14 inline-block font-semibold'}>author:</span>
                            <input className={'w-44'} id={'author_input'} type={'text'} value={newBlog?.author}
                                   onChange={(event) => formChangeHandler(event, 'author')}/>
                        </label>
                        <label className={'block mb-2'}>
                            <span className={'w-14 inline-block font-semibold'}>url:</span>
                            <input className={'w-44'} id={'url_input'} type={'text'} value={newBlog?.url}
                                   onChange={(event) => formChangeHandler(event, 'url')}/>
                        </label>
                    </div>
                    <button className={'mt-2 mb-4 border-2 border-blue-400 mr-16 bg-blue-400 text-gray-100 hover:bg-blue-500 rounded-2xl px-4 leading-7'} id={'submit_newBlog'} type={'submit'}>Submit</button>
                </form>
            </div>
        </fieldset>
    )
}

export default BlogForm
