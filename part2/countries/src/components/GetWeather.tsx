import React, {useEffect, useState} from 'react';
import axios from "axios";

interface GetWeatherProps {
    capital: string
}

interface WeatherInfo {
    temperature: number
    icon: string
    wind: {
        speed: number,
        deg: number
    }
}

const GetWeather = ({capital}: GetWeatherProps): JSX.Element => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherInfo, setIeatherInfo] = useState<WeatherInfo>()
    useEffect(() => {
        axios
            // blocked due to openweathermap's CORS policy
            .get(`https://samples.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then(res => setIeatherInfo(
                    {
                        "temperature": res.data.main.temp,
                        "icon": res.data.weather[0]['icon'],
                        "wind": {
                            speed: res.data.wind.speed,
                            deg: res.data.wind.deg
                        }
                    }
                )
            )
    }, [api_key, capital])
    return (
        <div>
            <div>{capital}</div>
            <img src={`http://openweathermap.org/img/wn/${weatherInfo?.icon}@2x.png`} alt=""/>
        </div>
    );
};

export default GetWeather;
