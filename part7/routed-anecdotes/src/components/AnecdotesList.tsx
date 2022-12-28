import React from 'react';
import {useAppSelector} from "../app/hooks";

export default function AnecdotesList() {
    const anecdotes = useAppSelector(state => state.anecdotes)

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(a =>
                <li key={a.id}>
                    <a href={`/anecdotes/${a.id}`}>{a.content}</a>
                </li>)}
        </div>
    );
}
