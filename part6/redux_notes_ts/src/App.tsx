import React from 'react';
import './App.css'

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

function App() {



    // const filterSelected = (value:toggleEnum) => {
    //     console.log(value,toggleEnum.ALL)
    //     dispatch(showImportant(value))
    // }

    return (
        <div className={'appContainer'}>
            {/* Title */}
            <h1>Note</h1>

            {/* Form */}
            <NoteForm/>

            {/*filter*/}
            <VisibilityFilter/>


            {/* Display */}
            <Notes/>
        </div>
    );
}

export default App;
