import {NotificationType} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";

const initialState: NotificationType = {
    content: ''
}

const notificationSlice = createSlice({
    name: 'notificaiton',
    initialState,
    reducers: {
        changeNotification: (state, action: PayloadAction<string>) => {
            state.content = action.payload
        },
        clearNotification: () => {
            return initialState
        }

    }
})

export const {changeNotification, clearNotification} = notificationSlice.actions

// action creators
let timeoutID: NodeJS.Timeout
export const showNotification = (content: string, time: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(changeNotification(content))
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => dispatch(clearNotification()), time * 1000)
    }
}

export default notificationSlice.reducer
