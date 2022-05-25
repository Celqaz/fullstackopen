import React, {useEffect, useState} from 'react';
//types
import {Message, Person,MessageType} from "./types";
//components
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
// services
import personsService from './services/persons'
import Notification from "./components/Notification";
// style
import './App.css'
// start server
// npx json-server --port 3001 --watch db.json

function App() {
    const [persons, setPersons] = useState<Person[]>([])
    const [message, setMessage] = useState<Message>({message:'',type: MessageType.Blank})

    useEffect(() => {
        personsService
            .getAllPersons()
            .then((res) => {
                setPersons(res.data)
            })
    }, [])

    const [filter, setFilter] = useState<string>('')
    //
    const filteredPersons: Person[] = persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <Notification message={message}/>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter}/>
            <h3>Add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} setPersons={setPersons} setMessage={setMessage}/>
        </div>
    );
}

export default App;
