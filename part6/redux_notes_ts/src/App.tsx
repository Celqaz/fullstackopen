import React, {useEffect} from 'react';
import './App.css'

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import {useAppDispatch} from "./hooks";
// service
import noteService from './services/notes'
import {setNotes} from "./reducers/noteSlice";

function App() {
    const dispatch = useAppDispatch()
    // fetch data
    useEffect(()=>{
        noteService.getAll()
            .then(notes => dispatch(setNotes(notes)))
    },[dispatch])

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
