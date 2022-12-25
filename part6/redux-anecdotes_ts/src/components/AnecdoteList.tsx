import React from 'react';
import {vote} from "../reducers/anecdotesReducer";
import {useAppSelector} from "../hooks";
import {useDispatch} from "react-redux";
import {handle} from "../tools/tools";
import {Anecdote} from "../types";
import {changeNotification, clearNotification} from "../reducers/notificationReducer";

export default function AnecdoteList() {
    const {filter} = useAppSelector(state => state.filter)

    const anecdotes = useAppSelector(state => state.anecdotes.filter(a => a.content.indexOf(filter) !== -1))

    const sortedAnecdotes = anecdotes.sort(handle())

    const dispatch = useDispatch()

    const voteHandler = (anecdote: Anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(changeNotification('You voted ' + anecdote.content))
        setTimeout(() => dispatch(clearNotification()), 2500)
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
