import React from 'react';
import {updateAnecdotesVote} from "../reducers/anecdotesReducer";
import {useAppDispatch, useAppSelector} from "../hooks";
import {handle} from "../tools/tools";
import {Anecdote} from "../types";
import {showNotification} from "../reducers/notificationReducer";

export default function AnecdoteList() {
    const {filter} = useAppSelector(state => state.filter)

    const anecdotes = useAppSelector(state => state.anecdotes.filter(a => a.content.indexOf(filter) !== -1))

    const sortedAnecdotes = anecdotes.sort(handle())

    const dispatch = useAppDispatch()

    const voteHandler = (anecdote: Anecdote) => {
        dispatch(updateAnecdotesVote(anecdote.id))
        dispatch(showNotification(`You voted ${anecdote.content}`, 2.5))
    }

    if (!anecdotes) {
        return <div></div>
    }

    return (
        <div>
            {sortedAnecdotes.map(
                a => <div key={a.id} className={'anecdote-item'}>
                    <div>
                        {a.content}
                    </div>
                    <div>
                        has {a.votes}
                        <button onClick={() => voteHandler(a)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
