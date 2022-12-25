import React from 'react';
import {useAppDispatch} from "../hooks";
import {add} from "../reducers/anecdotesReducer";
// tools
import {getId} from "../tools/tools";
import {changeNotification, clearNotification} from "../reducers/notificationReducer";

export default function AnecdoteForm (){

    const dispatch = useAppDispatch()
    const formSubmitHandler = (event: React.FormEvent)=>{
        event.preventDefault()
        // 拓展 type
        const target = event.target as typeof event.target & {
            anecdote: { value: string };
        };
        dispatch(add(
            {
                id:getId(),
                content:target.anecdote.value,
                votes:0
            }
        ))
        dispatch(changeNotification('You created ' + target.anecdote.value))
        setTimeout(() => dispatch(clearNotification()),2500)
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
