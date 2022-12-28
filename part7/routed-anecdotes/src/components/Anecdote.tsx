import React from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../app/hooks";

export default function Anecdote() {

    const {id} = useParams()

    const anecdote = useAppSelector(state => state.anecdotes.find(a => a.id === id))

    if (!anecdote) {
        return <div>not found</div>
    }

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>has {anecdote.votes} votes</div>
            <div>for more information see <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}
