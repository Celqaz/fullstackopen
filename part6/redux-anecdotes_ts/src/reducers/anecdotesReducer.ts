import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Anecdote} from "../types";
import {getId} from "../tools/tools";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote: string) : Anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState: Anecdote[] = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
        vote: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const itemToChange = state.find(s => s.id === action.payload)
            if (itemToChange) {
                const changedItem = {
                    ...itemToChange,
                    votes: itemToChange.votes + 1
                }
                return state.map(a => a.id !== id ? a : changedItem)
            }
            return state
        },
        add: (state, action:PayloadAction<Anecdote>) => {
            return [...state, action.payload]
        }
    }
})

export const {vote,add} = anecdotesSlice.actions
export default anecdotesSlice.reducer