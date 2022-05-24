import axios from "axios";
import {Person} from "../types";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get<Person[]>(baseUrl)
}

const create = (newObject:Person) => {
    return axios.post(baseUrl, newObject)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

const personsService =  {
    getAllPersons: getAll,
    createPerson: create,
}
export default personsService
