import React from 'react'
import {add} from "../reducers/noteSlice";
import {useAppDispatch} from "../hooks";


const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const NoteForm = () => {
    const dispatch = useAppDispatch()

    // form Handler
    const formHandler = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        // 拓展 type
        const target = event.target as typeof event.target & {
            note: { value: string };
        };
        const content = target.note.value
        target.note.value = ''
        console.log(content)
        dispatch(add({
            content:content,
            id:generateId(),
            important:false
        }))

    }

    return (
        <div>
            <form onSubmit={formHandler}>
                <input type="text" name="note"/>
                <button type={"submit"}>submit</button>
            </form>

        </div>
    )
}

export default NoteForm
