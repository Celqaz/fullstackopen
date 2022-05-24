import React, {useEffect, useState} from 'react';
//types
import {Person} from "./types";
//components
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
// services
import personsService from './services/persons'
// start server
// npx json-server --port 3001 --watch db.json

function App() {
    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        console.log('effect')
        personsService
            .getAllPersons()
            .then((res) => {
                setPersons(res.data)
            })
    }, [])

    const [filter, setFilter] = useState<string>('')

    const filteredPersons: Person[] = persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter}/>
            <h3>add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons}/>
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} setPersons={setPersons}/>
        </div>
    );
}

export default App;
