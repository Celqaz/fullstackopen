import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Anecdote} from "../types";
import {AppDispatch} from "../store";
import anecdotesService from "../service/anecdotesService";

const initialState: Anecdote[] = []

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
        add: (state, action: PayloadAction<Anecdote>) => {
            return [...state, action.payload]
        },
        setAnecdotes: (state, action: PayloadAction<Anecdote[]>) => {
            return action.payload
        },
        createAnecdote: (state, action: PayloadAction<Anecdote>) => {
            state.push(action.payload)
        }
    }
})

export const {vote, add, setAnecdotes, createAnecdote} = anecdotesSlice.actions
// action creator
// 从后端获取全部的数据
export const initializeAnecdotes = () => {
    return async (dispatch: AppDispatch) => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

// 新增数据
export const createAnecdotes = (content: string) => {
    return async (dispatch: AppDispatch) => {
        const anecdotes = await anecdotesService.postNew(content)
        dispatch(createAnecdote(anecdotes))
    }
}

// 更新数据
export const updateAnecdotesVote = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await anecdotesService.patchVote(id)
        dispatch(vote(id))
    }
}

export default anecdotesSlice.reducer
