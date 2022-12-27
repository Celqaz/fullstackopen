import {createSlice} from "@reduxjs/toolkit";
import {NoteType} from "../types";

const initialNotes : NoteType[] = [
    {
        id: 1123,
        content: "Good day",
        important : false
    },
    {
        id: 2752,
        content: "Hawaii",
        important : true
    }
]

const notesSlice = createSlice({
    name:"notes",
    initialState: initialNotes,
    reducers:{
        all: state => state
    }
})

export const {all} = notesSlice.actions

export default notesSlice.reducer
