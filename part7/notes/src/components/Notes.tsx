import React from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks";

export default function Notes() {

    const notes = useAppSelector(state => state.notes)


    return (
        <div>
            {notes.map(note => <li key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li>)}
        </div>
    )
}
