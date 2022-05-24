import React, {useState} from 'react';
import {Person} from "../types";

interface PersonFormProps {
    persons: Person[]
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
}

/**
 * 添加person的表单
 * @param persons，上层应用中的数据
 * @param setPersons，修改数据的方法
 * @constructor
 */
const PersonForm = ({persons, setPersons}: PersonFormProps): JSX.Element => {
    const [newName, setNewName] = useState<string>('')
    const [newNumber, setNewNumber] = useState<string>('')

    /**
     * input 中 name 字段更改，更新name state
     * @param event
     */
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewName(event.target.value)
    }
    /**
     * input 中 number 字段更改，更新number state
     * @param event
     */
    const numberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewNumber(event.target.value)
    }

    /**
     * 表表单提交方法；
     * 如果添加的对象name，在已有数据中存在，则通过 window.alert 提醒
     * @param event
     */
    const formSubmitHandler = (event: React.FormEvent): void => {
        event.preventDefault()
        if (persons.find(person => person.name === newName))
            window.alert(`${newName} is already added to phonebook.`)
        else {
            setPersons([...persons, {name: newName, number: newNumber}])
        }
        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <div>
                    name: <input value={newName} onChange={nameChangeHandler}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={numberChangeHandler}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;
