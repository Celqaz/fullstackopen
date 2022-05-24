import React, {useEffect, useState} from 'react';
import axios from "axios";

// types
import {CountryInfo as CountryInfoType} from '../types'
import ListCountries from "./ListCountries";
import CountryInfo from "./CountryInfo";

interface CountriesInfoProps {
    searchField: string
}

const CountriesInfo = ({searchField}: CountriesInfoProps): JSX.Element => {
    const [countriesInfo, setCountriesInfo] = useState<CountryInfoType[]>()
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (searchField) {
            axios
                .get<CountryInfoType[]>(`https://restcountries.com/v3.1/name/${searchField}`)
                .then(res => {
                    setCountriesInfo(res.data)
                })
                .catch(ex => {
                    // const errorMessage = ex.response.status === 404
                    //     ? "No matched countries Found."
                    //     : "An unexpected error has occurred";
                    setError(ex.message)
                    setCountriesInfo([])
                })
        }
    }, [searchField])

    if (!countriesInfo) {
        return <></>
    }

    console.log('countries data',countriesInfo)
    if (countriesInfo.length > 10) {
        return <div>Too many matches,specify another filter.</div>
    } else if (countriesInfo.length > 1) {
        return <ListCountries countries={countriesInfo}/>
    } else if (countriesInfo.length === 1) {
        return <CountryInfo country={countriesInfo[0]}/>
    }else {
        return <div>{error}</div>
    }

};

export default CountriesInfo;
