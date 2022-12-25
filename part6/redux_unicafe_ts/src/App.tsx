import React from 'react';
import './App.css';
// redux
// hooks
import {useAppSelector, useAppDispatch} from './hooks'
// reducer actions
import {addGood, addOK, addBad, init} from "./reducers/cafeReducer";

function App() {
    const rate = useAppSelector(state => state.cafe)
    const dispatch = useAppDispatch()
    return (
        <div>
            <button onClick={()=>dispatch(addGood())}>
                Feels Good
            </button>
            <button onClick={()=>dispatch(addOK())}>
                Feels OK
            </button>
            <button onClick={()=>dispatch(addBad())}>
                Feels Bad
            </button>
            <button onClick={()=>dispatch(init())}>
                Init
            </button>
            <div>
                Good: {rate.good}
            </div>
            <div>
                OK:{rate.ok}
            </div>
            <div>
                Bad:{rate.bad}
            </div>
        </div>
    );
}

export default App;
