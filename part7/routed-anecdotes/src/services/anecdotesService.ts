import axios from 'axios'
import {AnecdoteType} from "../types/types";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postNew = async (params: Pick<AnecdoteType, "content" | "author" | "info">) => {
    const anecdoteObj: Omit<AnecdoteType, "id"> = {
        content: params.content,
        author: params.author,
        info: params.info,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdoteObj)
    return response.data
}


const anecdotesService = {
    getAll,
    postNew
}
export default anecdotesService
