import React from 'react';
import {useAppDispatch} from "../hooks";
import {createAnecdotes} from "../reducers/anecdotesReducer";
// redux

export default function FilterForm() {
    const dispatch = useAppDispatch()

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log('change',event.target.value)
        dispatch(createAnecdotes(event.target.value))
    }
    return (
        <div>
            <form action="">
                filter: <input type="text" onChange={changeHandler}/>
            </form>
        </div>
    )
}
