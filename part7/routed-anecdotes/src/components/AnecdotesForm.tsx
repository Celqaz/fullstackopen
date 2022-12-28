import React, {useState} from 'react';
import {useAppDispatch} from "../app/hooks";
import {addNewAnecdotes} from "../features/anecdotes/anecdotesSlice";
import {showNotification} from "../features/notification/notificationSlice";
import {useNavigate} from "react-router-dom";
export default function AnecdotesForm (){

    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const navigate = useNavigate()


    const dispatch = useAppDispatch()
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log('submit')
        dispatch(addNewAnecdotes({content: content,author:author,info:info}))
        navigate('/')
        dispatch(showNotification(content,2))
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}
