import React from 'react';
import './App.css'

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

function App() {
    return (
        <div className={'appContainer'}>
            {/* Title */}
            <h1>Note</h1>

            {/* Form */}
            <NoteForm/>

            {/* Display */}
            <Notes/>
        </div>
    );
}

export default App;
