import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const getAllUser = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUserByID = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
const usersService = {getAllUser, getUserByID}
export default usersService
