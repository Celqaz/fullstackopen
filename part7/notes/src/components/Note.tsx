import React from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks";

export default function Note (){
    const {id} = useParams()
    const notes = useAppSelector(state => state.notes)
    const note = notes.find(n => n.id === Number(id))

    if (!note){
        return <div></div>
    }

    return(
        <div>
            {note.content}
        </div>
    )
}
