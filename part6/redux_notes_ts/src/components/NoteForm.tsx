import React from 'react'
import {createNewNote} from "../reducers/noteSlice";
import {useAppDispatch} from "../hooks";
// import noteService from "../services/notes";
// import {NoteState} from "../types";


// const generateId = () =>
//     Number((Math.random() * 1000000).toFixed(0))

const NoteForm = () => {
    const dispatch = useAppDispatch()

    // form Handler
    const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // 拓展 type
        const target = event.target as typeof event.target & {
            note: { value: string };
        };
        const content = target.note.value
        target.note.value = ''
        // const newNote: NoteState = await noteService.createNew(content)
        // dispatch(add({
        //     content: content,
        //     id: generateId(),
        //     important: false
        // }))

        dispatch(createNewNote(content))
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
