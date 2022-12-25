import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NoteState} from "../types";

// import type {RootState} from "../store";

// interface NoteState {
//     data: DataType
// }

const initialState: NoteState[] = [
    {
        content: "hi",
        id: 5,
        important: false
    },
    {
        content: "Port",
        id: 6,
        important: true
    }
]

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<NoteState>) => {
            return [...state, action.payload]
        },
        pop: state => {
            state.pop()
        },
        // change the importance of a note, given the id of that note
        importance: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            if (noteToChange) {
                // only change the importance, leave other things unchanged
                const changedNote = {
                    ...noteToChange,
                    important: !noteToChange?.important
                }
                // return all unchanged notes and the changed note
                return state.map(note => note.id !== id ? note : changedNote)
            }
            return state
        },
        // showImportant: (state, action: PayloadAction<toggleEnum>) => {
        //     if (action.payload === toggleEnum.IMPORTANT) {
        //         return state.filter(note => note.important === true)
        //     } else if (action.payload === toggleEnum.NONIMPORTANT) {
        //         return state.filter(note => note.important === false)
        //     } else {
        //         return state
        //     }
        // }
    }
})

export const {add, importance} = noteSlice.actions

export default noteSlice.reducer
