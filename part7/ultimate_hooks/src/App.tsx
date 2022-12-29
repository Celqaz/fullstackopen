import React, { useState, useEffect } from 'react'
import {useField,useResource} from "./hooks/hooks";
import {NoteType} from "./index";


// const useResource = (baseUrl) => {
//     const [resources, setResources] = useState([])
//
//     // ...
//
//     const create = (resource) => {
//         // ...
//     }
//
//     const service = {
//         create
//     }
//
//     return [
//         resources, service
//     ]
// }

const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    // const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [notes, noteService]= useResource('http://localhost:3001/notes')
    const [persons, personService] = useResource('http://localhost:3001/persons')

    console.log('notes',notes)


    const handleNoteSubmit = (event : React.FormEvent) => {
        event.preventDefault()
        noteService.create({ content: content.value })
    }

    const handlePersonSubmit = (event : React.FormEvent) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value})
    }


    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button>create</button>
            </form>
            {/*@ts-ignore*/}
            {notes.map(n => <p key={n.id}>{n.content}</p>)}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br/>
                number <input {...number} />
                <button>create</button>
            </form>
            {/*@ts-ignore*/}
            {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
        </div>
    )
}

export default App
