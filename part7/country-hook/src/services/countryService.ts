import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/name'

const getCountryByName = async (name:string)=>{
    const response = await axios.get(`${baseUrl}/${name}`)
    return response.data
}


const countryService ={
    getCountryByName
}
export default countryService
