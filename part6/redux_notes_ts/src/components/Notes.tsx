import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {importance} from "../reducers/noteSlice";
import {ImportanceEnum} from "../types";

export default function Notes (){
    const dispatch = useAppDispatch()

    // const notes = useAppSelector(state => state.note)


    const notes = useAppSelector(state => {
        if ( state.importance.filter === ImportanceEnum.ALL ) {
            return state.note
        }
        return state.importance.filter  === ImportanceEnum.IMPORTANT
            ? state.note.filter(note => note.important)
            : state.note.filter(note => !note.important)
    })

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
