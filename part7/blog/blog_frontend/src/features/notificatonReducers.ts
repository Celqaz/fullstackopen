import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageType, TempMessageProps} from "../types";
import {AppDispatch} from "../app/store";

const initialNotification: TempMessageProps = {type: MessageType.Success, message: ''}
// const initialNotification: TempMessageProps = {type: MessageType.Success, message: null}
const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,
    reducers: {
        setNotification: (state, action: PayloadAction<TempMessageProps>) => {
            return action.payload
        },
        resetNotification: () => initialNotification
    }
})

export const {setNotification, resetNotification} = notificationSlice.actions

let timeoutID: NodeJS.Timeout
export const displayNotification = (messageObj : TempMessageProps,time: number = 2) =>{

    return (dispatch: AppDispatch) => {
        dispatch(setNotification(messageObj))
        console.log('setNoti')
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => dispatch(resetNotification()), time * 1000)
    }
}



export default notificationSlice.reducer
