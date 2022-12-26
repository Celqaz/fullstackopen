import axios from "axios";
import {NewAnecdote} from "../types";

const baserUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baserUrl)
    return response.data
}

const postNew = async (content: string) => {
    const anecdoteObj: NewAnecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baserUrl, anecdoteObj)
    return response.data
}

const patchVote = async (id: string) => {
    const {data} = await axios.get(`${baserUrl}/${id}`)
    const response = await axios.patch(`${baserUrl}/${id}`, {votes: data.votes + 1})
    return response.data
}

const anecdotesService = {
    getAll,
    postNew,
    patchVote
}

export default anecdotesService
