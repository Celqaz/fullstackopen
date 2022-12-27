import {configureStore} from "@reduxjs/toolkit";
// slice
import notesSlice from "./reducers/notesSlice";

const store = configureStore({
    reducer:{
        notes: notesSlice,
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
