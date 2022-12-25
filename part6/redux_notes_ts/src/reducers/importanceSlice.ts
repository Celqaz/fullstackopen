import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterType, ImportanceEnum} from "../types";


const initialState: FilterType = {
    filter: ImportanceEnum.ALL
}

const importanceSlice = createSlice({
    name:"importance",
    initialState,
    reducers:{
        change: (state, action:PayloadAction<ImportanceEnum>)=>{
            state.filter = action.payload
        }

    }
})

export const {change} = importanceSlice.actions
export default importanceSlice.reducer
