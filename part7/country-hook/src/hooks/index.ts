import React, {useEffect, useState} from "react";
import countryService from "../services/countryService";
import {CountryType} from "../types/types";
const useField = (type : string) => {
    const [value, setValue] = useState('')

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}



const useCountry = (countryName:string) =>{
    const [country, setCountry] = useState<CountryType[]>([])

    useEffect(() => {
        countryService.getCountryByName(countryName)
            .then(data => setCountry(data))
    },[countryName])

    return country
}



export {
    useField,
    useCountry
}
