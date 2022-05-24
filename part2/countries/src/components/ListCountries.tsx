import React, {useState} from 'react';
import axios from "axios";
import CountryInfo from "./CountryInfo";
import {CountryInfo as CountryInfoType} from "../types";

interface ListCountriesProps {
    countries: CountryInfoType[]
}

const ListCountries = ({countries}: ListCountriesProps): JSX.Element => {
    const [countryInfo, setCountryInfo] = useState<CountryInfoType[]>()
    const showCountryInfo = (countryName:string)=>{
        axios
            .get<CountryInfoType[]>(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(res => {
                setCountryInfo(res.data)
            })
            .catch(ex => {
                console.log(ex.message)
            })
    }
    console.log('list', countryInfo)
    return (
        <div>
            <ul>
                {countries.map(country =>
                    <li key={country.name.common}>
                        {country.name.common}<button onClick={()=>showCountryInfo(country.name.common)}>show</button>
                    </li>
                )}
            </ul>
            {countryInfo && <CountryInfo country={countryInfo[0]}/>}
        </div>
    );
};

export default ListCountries;
