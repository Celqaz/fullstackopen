import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {importance} from "../reducers/noteSlice";

export default function Notes (){
    const dispatch = useAppDispatch()

    const notes = useAppSelector(state => state.note)


    // toggle importance
    const toggleImportance = (id: number) => {
        dispatch(importance(id))
    }

    return(
        <div>
            {notes.map(note =>
                <li key={note.id} className={note.important ? 'importantNote' : ''}
                    onClick={() => toggleImportance(note.id)}>
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
            )}
        </div>
    )
}
