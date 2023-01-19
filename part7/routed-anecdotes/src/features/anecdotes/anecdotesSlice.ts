import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AnecdoteType} from "../../types/types";
import anecdotesService from "../../services/anecdotesService";
import {AppDispatch} from "../../../../notes/src/store";


const initialAnecdotes: AnecdoteType[] = []

const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState: initialAnecdotes,
    reducers: {
        setAnecdotes: (state, action: PayloadAction<AnecdoteType[]>) => {
            return action.payload
        },
        addAnecdote: (state, action: PayloadAction<AnecdoteType>) => {
            return [...state, action.payload]
        }
    }
})

export const {setAnecdotes, addAnecdote} = anecdotesSlice.actions

// action creator
export const initializeAnecdotes = () => {
    return async (dispatch: AppDispatch) => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const addNewAnecdotes = (content: Pick<AnecdoteType, "content" | "author" | "info" >) => {
    return async (dispatch: AppDispatch) => {
        const anecdotes = await anecdotesService.postNew(content)
        dispatch(addAnecdote(anecdotes))
    }
}
export default anecdotesSlice.reducer
