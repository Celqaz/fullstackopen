import axios from "axios";
import {Person} from "../types";

const baseUrl = 'https://fso3-phonebook.herokuapp.com/api/persons'

const getAllPersons = () => {
    return axios.get<Person[]>(baseUrl)
}

const createPerson = (newPerson:Person) => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = (id:number) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePersonNumber = (newPerson: Person) =>{
    console.log('update service',newPerson)
    return axios.put(`${baseUrl}/${newPerson.id}`,newPerson)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

const personsService =  {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePersonNumber
}
export default personsService
