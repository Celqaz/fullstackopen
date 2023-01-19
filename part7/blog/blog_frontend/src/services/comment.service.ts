import axios from 'axios'
import {token} from "./blogs.service";
import {CommentType} from "../types";


const baseUrl = 'http://localhost:3001/api/comments'


const postNewComment = async (newComment: CommentType) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.post(baseUrl, newComment, config)
    return response.data
}

const commentServices = {
    postNewComment
}

export default commentServices
