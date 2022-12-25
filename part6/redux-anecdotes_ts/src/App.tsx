import React from 'react';
import './App.css';

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

function App() {

    return (
        <div className={"App"}>
            <h1>Anecdotes</h1>
            <AnecdoteForm/>
            <AnecdoteList/>
        </div>
    );
}

export default App;
