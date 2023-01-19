import axios from 'axios'
import {credentialsType} from "../types";

const baseUrl = 'http://localhost:3001/api/login'



const login = async (credentials: credentialsType) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const loginService= { login }
export default loginService
