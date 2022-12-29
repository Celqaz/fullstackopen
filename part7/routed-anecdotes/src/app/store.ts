import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import anecdotesReducer from "../features/anecdotes/anecdotesSlice";
import notificationReduce from "../features/notification/notificationSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        anecdotes: anecdotesReducer,
        notification: notificationReduce
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
