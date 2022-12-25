import React from 'react';
import './App.css';

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {useAppSelector} from "./hooks";
import FilterForm from "./components/FilterForm";

function App() {
    const notification = useAppSelector(state => state.notification)

    return (
        <div className={"App"}>
            <h1>Anecdotes</h1>
            {/*Form*/}
            <AnecdoteForm/>
            {/*Notification*/}
            {/* if notification.content != null, show Notification component, otherwise just hide it.*/}
            {notification.content && <Notification/>}
            {/*Filter*/}
            <FilterForm/>
            {/*Display*/}
            <AnecdoteList/>
        </div>
    );
}

export default App;
