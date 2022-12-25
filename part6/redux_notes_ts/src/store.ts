import {configureStore} from '@reduxjs/toolkit'
// import
import counterReducer from "../src/reducers/counterSlice";
import noteReducer from "../src/reducers/noteSlice"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        note: noteReducer,
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

