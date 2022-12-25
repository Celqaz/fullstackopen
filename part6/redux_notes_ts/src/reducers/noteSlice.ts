import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// import type {RootState} from "../store";

interface NoteState {
    content: string;
    important: boolean;
    id: number;
}

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
        }
    }
})

export const {add, pop,importance} = noteSlice.actions

export default noteSlice.reducer
