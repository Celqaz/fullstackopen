import {FilterType} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:FilterType = {
    filter:''
}

const filterReducer = createSlice({
    name: "filter",
    initialState,
    reducers:{
        changeFilter: (state, action:PayloadAction<string>) => {
            state.filter = action.payload
        }
    }
})

export const {changeFilter} = filterReducer.actions

export default filterReducer.reducer
