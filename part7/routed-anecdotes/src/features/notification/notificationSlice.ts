import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NotificationType} from "../../types/types";
import {AppDispatch} from "../../app/store";

const initialNotification: NotificationType = ''
const notificationSlice = createSlice({
    name: "notification",
    initialState: initialNotification,
    reducers: {
        setNotification: (state, action: PayloadAction<NotificationType>) => {
            state = action.payload
            return state
        },
        initNotification: () => {
            return initialNotification
        }
    }
})

export const {initNotification, setNotification} = notificationSlice.actions

export const showNotification = (content: NotificationType, time: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(setNotification(content))
        setTimeout(() => dispatch(initNotification()), time * 1000)
    }
}

export default notificationSlice.reducer
