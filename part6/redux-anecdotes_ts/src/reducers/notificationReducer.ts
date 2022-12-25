import {NotificationType} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
export default notificationSlice.reducer
