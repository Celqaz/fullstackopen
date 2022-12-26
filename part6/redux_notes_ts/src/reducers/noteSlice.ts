import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NoteState} from "../types";
import noteService from "../services/notes";
import {AppDispatch} from "../store";

const initialState: NoteState[] = []

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
        setNotes(state, action: PayloadAction<NoteState[]>) {
            return action.payload
        },
        createNote: (state, action: PayloadAction<NoteState>) => {
            state.push(action.payload)
        }
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

export const {add, importance, setNotes, createNote} = noteSlice.actions

// 通过Redux Thunk可以实现action creators，它返回一个函数而不是一个对象。
// 该函数接收Redux存储的dispatch和getState方法作为参数。
// 这允许异步动作创建者的实现，它首先等待某个异步操作的完成，然后分派一些动作，改变 store 的状态。
export const initializeNotes = () => {
    // const dispatch = useAppDispatch()
    return async (dispatch: AppDispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNewNote = (content : string) => {
    return async (dispatch : AppDispatch) => {
        const newNote = await noteService.createNew(content)
        dispatch(createNote(newNote))
    }
}

export default noteSlice.reducer

