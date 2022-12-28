import React from 'react';
import {CountryType} from "../types/types";

export default function Country (country: CountryType){
    if (!country) {
        return <div>not found...</div>
    }

    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>population {country.population}</div>
            <div>capital {country.capital}</div>
            <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
        </div>
    )
}
