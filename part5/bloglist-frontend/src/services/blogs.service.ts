import axios from 'axios'
import {newBlogType} from "../types";

const baseUrl = 'http://localhost:3001/api/blogs'
let token: string = ''

const setToken = (newToken: string) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postNewBlog = async (newBlog: newBlogType) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}
export default {getAll, setToken,postNewBlog}
