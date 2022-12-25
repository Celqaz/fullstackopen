import {configureStore} from '@reduxjs/toolkit'
// import
import counterReducer from "../src/reducers/counterSlice";
import noteReducer from "../src/reducers/noteSlice"
import importanceReducer from "./reducers/importanceSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        note: noteReducer,
        importance: importanceReducer
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

