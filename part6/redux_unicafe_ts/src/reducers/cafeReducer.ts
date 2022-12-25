import {createSlice} from "@reduxjs/toolkit";

// State Type
interface RateState {
    good: number,
    ok: number,
    bad: number
}

// initial State
const initialState: RateState = {
    good:0,
    ok:0,
    bad:0
}

// create slice
const cafeSlice = createSlice({
    name:"cafe",
    initialState,
    reducers:{
        addGood: state => {
            state.good += 1
            return state
        },
        addOK: state => {
            state.ok += 1
            return state
        },
        addBad: state => {
            state.bad += 1
            return state
        },
        init: () => initialState,
    }
})

export const {addGood,addOK,addBad,init} = cafeSlice.actions

export default cafeSlice.reducer
