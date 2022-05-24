import React from 'react';
import {CountryInfo as CountryInfoType} from "../types";
import GetWeather from "./GetWeather";

interface CountryInfoProps {
    country: CountryInfoType
}

const CountryInfo = ({country}: CountryInfoProps): JSX.Element => {
    // if (!country){
    //     return <></>
    // }
    console.log('country',country)
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>capital:{country.capital}</div>
            <div>population:{country.population}</div>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language}>{language}</li> )}
            </ul>
            <img src={country.flags.png} alt={country.name.common+' flag'}/>
            <h2>Weather in {country.capital}</h2>
            <GetWeather capital={country.capital}/>
        </div>
    );
};

export default CountryInfo;
