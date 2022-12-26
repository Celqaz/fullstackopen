import axios from "axios";
import {NewNoteState} from "../types";

const baseURl = 'http://localhost:3001/notes'

const getAll = async () =>{
    const response = await axios.get(baseURl)
    return response.data
}

const createNew = async (content: string) =>{
    const noteObj:NewNoteState = {
        content,
        important:false
    }
    const response = await axios.post(baseURl, noteObj)
    return response.data
}

const noteService = {
    getAll,
    createNew
}
export default noteService
