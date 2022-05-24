import React from 'react';
import {Person} from "../types";

interface PersonsProps {
    persons: Person[]
}

/**
 * 遍历render每一在persons数组中的，person对象
 * @param persons
 * @constructor
 */
const Persons = ({persons}: PersonsProps): JSX.Element => {
    return (
        <div>
            {persons.map(p => <p key={p.name}>{p.name}:{p.number}</p>)}
        </div>
    );
};

export default Persons;

