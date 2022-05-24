import axios from "axios";
import {Person} from "../types";

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get<Person[]>(baseUrl)
}

const createPerson = (newObject:Person) => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = (id:number) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

const personsService =  {
    getAllPersons,
    createPerson,
    deletePerson
}
export default personsService
