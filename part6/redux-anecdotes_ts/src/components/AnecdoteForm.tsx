import React from 'react';
import {useAppDispatch} from "../hooks";
import {createAnecdote} from "../reducers/anecdotesReducer";
// tools
// import {getId} from "../tools/tools";
import {showNotification} from "../reducers/notificationReducer";
// service
import anecdotesService from "../service/anecdotesService";

export default function AnecdoteForm (){

    const dispatch = useAppDispatch()
    const formSubmitHandler = async (event: React.FormEvent)=>{
        event.preventDefault()
        // 拓展 type
        const target = event.target as typeof event.target & {
            anecdote: { value: string };
        };

        const newAnecdote = await anecdotesService.postNew(target.anecdote.value)
        target.anecdote.value = ''

        dispatch(createAnecdote(newAnecdote))
        dispatch(showNotification(`You created ${newAnecdote.content}`,2.5))
    }

    return(
        <div>
            <form onSubmit={formSubmitHandler}>
                <input type="text" name={"anecdote"}/>
                <button type={'submit'}>submit</button>
            </form>
        </div>
    )
}
