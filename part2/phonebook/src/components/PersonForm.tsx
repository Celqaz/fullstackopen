import React, {useState} from 'react';
import {Message, MessageType, Person} from "../types";
// services
import personsService from '../services/persons'

interface PersonFormProps {
    persons: Person[]
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
    setMessage: React.Dispatch<React.SetStateAction<Message>>
}

/**
 * 添加person的表单
 * @param persons，上层应用中的数据
 * @param setPersons，修改数据的方法
 * @param setMessage
 * @constructor
 */
const PersonForm = ({persons, setPersons,setMessage}: PersonFormProps): JSX.Element => {
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
        const newPerson : Person = {
            name: newName,
            number: newNumber
        }
        const existedPerson = persons.find(person => person.name === newName)
        // 如果输入的姓名已存在，则确认是否更新信息
        // 否则则进行新增
        if (existedPerson && window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with the new one?`))
            personsService
                .updatePersonNumber({...newPerson,id:existedPerson.id})
                .then(response => {
                    console.log('update res',response.data)
                    setPersons(persons.map(person=> person.id !== response.data.id ? person : response.data))
                    // setPersons(persons.concat(response.data))
                    console.log('res',response)
                    setMessage({message:`Updated ${response.data.name}`, type:MessageType.Success})
                    setTimeout(() => {
                        setMessage({message:'', type:MessageType.Blank})
                    }, 2000)
                    setNewName('')
                    setNewNumber('')
                })
        else {
            personsService
                .createPerson(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setMessage({message:`Added ${response.data.name}`, type:MessageType.Success})
                    setTimeout(() => {
                        setMessage({message:'', type:MessageType.Blank})
                    }, 2000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log(error.response.data)
                    setMessage({message: error.response.data.error, type: MessageType.Failure})
                    setTimeout(() => {
                        setMessage({message:'', type:MessageType.Blank})
                    }, 2000)
                })
        }

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
