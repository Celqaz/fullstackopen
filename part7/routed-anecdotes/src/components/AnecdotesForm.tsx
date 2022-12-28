import React from 'react';
import {useAppDispatch} from "../app/hooks";
import {addNewAnecdotes} from "../features/anecdotes/anecdotesSlice";
import {showNotification} from "../features/notification/notificationSlice";
import {useNavigate} from "react-router-dom";
import {useField} from "../hooks";
export default function AnecdotesForm (){

    const {reset : contentReset, ...content} = useField('text')
    const {reset: authorReset,...author} = useField('text')
    const {reset: infoReset, ...info} = useField('text')

    const navigate = useNavigate()


    const dispatch = useAppDispatch()
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log('submit')
        dispatch(addNewAnecdotes({content: content.value,author:author.value,info:info.value}))
        navigate('/')
        dispatch(showNotification(content.value,2))
    }

    const resetHandler = () =>{
        contentReset();
        authorReset();
        infoReset();
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type={'submit'}>create</button>
                <button type={'reset'} onClick={resetHandler}>reset</button>

            </form>
        </div>
    )
}
