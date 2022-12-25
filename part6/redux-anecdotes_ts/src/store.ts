import {configureStore} from '@reduxjs/toolkit'
// import
import anecdotesReducer from "./reducers/anecdotesReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdotesReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

