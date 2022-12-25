import React from 'react';
import {vote} from "../reducers/anecdotesReducer";
import {useAppSelector} from "../hooks";
import {useDispatch} from "react-redux";
import {handle} from "../tools/tools";

export default function AnecdoteList (){
    const anecdotes = useAppSelector(state => [... state.anecdotes].sort(handle()))
    const dispatch = useDispatch()

    return(
        <div>
            {anecdotes.map(
                a => <div key={a.id}>
                    <div>
                        {a.content}
                    </div>
                    <div>
                        has {a.votes}
                        <button onClick={() => dispatch(vote(a.id))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
