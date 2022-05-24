import React, {useState} from 'react';
//types
import {Person} from "./types";
//components
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";


function App() {
    const [persons, setPersons] = useState<Person[]>([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])

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
