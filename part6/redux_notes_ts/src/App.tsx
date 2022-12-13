import React from 'react';

import {useAppSelector, useAppDispatch} from './hooks'
import {decrement, increment, zero} from './reducers/counterSlice'

function App() {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div>
                {count}
            </div>
            <button onClick={() => dispatch(increment())}>
                plus
            </button>
            <button onClick={() => dispatch(decrement())}>
                decrement
            </button>
            <button onClick={() => dispatch(zero())}>
                zero
            </button>
        </div>
    );
}

export default App;
