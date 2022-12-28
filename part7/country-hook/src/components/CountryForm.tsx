import React from 'react';
import {useField, useCountry} from "../hooks";
import {CountryType} from "../types/types";

export default function CountryForm() {

    const searchInput = useField('text')

    const countryInfo: CountryType[] | null = useCountry(searchInput.value)
    const fetchData = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('data is coming.', searchInput.value)
    }

    console.log('countryInfo', countryInfo)

    return (
        <div>
            <form onSubmit={fetchData}>
                <input {...searchInput}/>
                <button type={'submit'}>find</button>
            </form>
            {countryInfo[0] &&
                <div>
                    <h2>{countryInfo[0].name.common}</h2>
                    <div>capital: {countryInfo[0].capital}</div>
                    <div>{countryInfo[0].population}</div>
                    <img src={countryInfo[0].flags.png} alt=""/>
                </div>
            }
        </div>
    )
}
