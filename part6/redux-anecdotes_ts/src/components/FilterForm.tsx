import React from 'react';
import {changeFilter} from "../reducers/filterReducer";
import {useAppDispatch} from "../hooks";
// redux

export default function FilterForm() {
    const dispatch = useAppDispatch()

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log('change',event.target.value)
        dispatch(changeFilter(event.target.value))
    }
    return (
        <div>
            <form action="">
                filter: <input type="text" onChange={changeHandler}/>
            </form>
        </div>
    )
}
