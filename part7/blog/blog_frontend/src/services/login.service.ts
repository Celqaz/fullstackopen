import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

interface credentialsType {
    username: string,
    password: string
}

const login = async (credentials: credentialsType) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const loginService= { login }
export default loginService
