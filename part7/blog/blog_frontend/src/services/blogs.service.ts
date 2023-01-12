import axios from 'axios'
import { BlogType, newBlogType } from '../types'

const baseUrl = 'http://localhost:3001/api/blogs'
let token = ''

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

// get all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogByID = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}
// post a new blog
const postNewBlog = async (newBlog: newBlogType) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// update a blog's like bt ID
const addBlogLike = async ({ id }:Pick<BlogType, 'id'>) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, config)
  return response.data
}

// delete a blog by Id
const deleteBlogByID = async ({ id }:Pick<BlogType, 'id'>) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('token in delete',token)
  return  await axios.delete(`${baseUrl}/${id}`, config)
}

const blogsService = { getAll, getBlogByID, setToken,postNewBlog,addBlogLike,deleteBlogByID }
export default blogsService
