import React from 'react';
import {Person} from "../types";
// service
import personsService from "../services/persons";

interface PersonsProps {
    persons: Person[]
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
}

/**
 * 遍历render每一在persons数组中的，person对象
 * @param persons
 * @param setPersons setState 方法
 * @constructor
 */
const Persons = ({persons, setPersons}: PersonsProps): JSX.Element => {
    const deletePersonHandler = (deleteInfo: Pick<Person, "id" | "name">) => {
        if (deleteInfo.id && window.confirm(`Delete ${deleteInfo.name}`)) {
            personsService
                .deletePerson(deleteInfo.id)
                .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            console.log('success')
                            setPersons(persons.filter(p => p.id !== deleteInfo.id))
                        } else {
                            console.log('failed to delete')
                        }
                    }
                )
        }
    }

    return (
        <div>
            {persons.map(p =>
                <div key={p.id}>{p.name}:{p.number}
                    <button onClick={() => deletePersonHandler({name: p.name, id: p.id})}>delete</button>
                </div>
            )}
        </div>
    );
};

export default Persons;

