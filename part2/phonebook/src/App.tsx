import React, {useEffect, useState} from 'react';
import axios from 'axios'
//types
import {Person} from "./types";
//components
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";


function App() {
    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        console.log('effect')
        axios
            .get<Person[]>('http://localhost:3001/persons')
            .then((res) => {
                console.log('Promise fullfilled')
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
            <Persons persons={filteredPersons}/>
        </div>
    );
}

export default App;
