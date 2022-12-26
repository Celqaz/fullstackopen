import React, {useEffect} from 'react';
import './App.css';

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {useAppDispatch, useAppSelector} from "./hooks";
import FilterForm from "./components/FilterForm";
// service
import anecdotesService from "./service/anecdotesService";
import {setAnecdotes} from "./reducers/anecdotesReducer";
function App() {
    const dispatch = useAppDispatch()
    const notification = useAppSelector(state => state.notification)

    useEffect(()=>{
        anecdotesService.getAll()
            .then( data => dispatch(setAnecdotes(data)))
    })

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
