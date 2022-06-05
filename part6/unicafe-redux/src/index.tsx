import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux'
import reducer from './reducer'
import {ReviewType} from "./types";

const store = createStore(reducer)

const App = () => {
    const good = () => {
        store.dispatch({
            type: ReviewType.GOOD
        })
    }

    return (
        <div>
            <button onClick={good}>good</button>
            <button>ok</button>
            <button>bad</button>
            <button>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>ok</div>
            <div>bad</div>
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const renderApp = () => {
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
};

renderApp()
store.subscribe(renderApp)
