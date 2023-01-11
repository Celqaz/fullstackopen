import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TempMessageProps} from "../types";

const initialNotification: Pick<TempMessageProps, "message"> = {message: ""}
const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,
    reducers: {
        all: state => state,
        setNotification: (state, action: PayloadAction<string>) => {
            return {message: action.payload}
        },
        reset: () => initialNotification
    }
})

export const {all, setNotification, reset} = notificationSlice.actions

export default notificationSlice.reducer
