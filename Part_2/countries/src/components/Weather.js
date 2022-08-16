import {useState, useEffect} from "react";
import axios from "axios";

const Weather = ({countryCapital}) => {
    console.log(countryCapital)
    const [weatherCountry, setWeatherCountry] = useState()
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${api_key}`

    console.log(url)
    const hook = () => {
        axios
            .get(url)
            .then(response => {
                setWeatherCountry(response.data)
            })
        }
    useEffect(hook, [])
    console.log(weatherCountry)

    const src = `http://openweathermap.org/img/wn/${weatherCountry?.weather[0].icon}@2x.png`
    const imgSrc = `${weatherCountry?src: '#'}`

    return (
        <>
            <h2>Weather in {countryCapital}</h2>
            <p>temperature {Math.round((weatherCountry?.main.temp - 273.2) * 10) / 10} celsius</p>
            <img src={imgSrc} alt="weather icon image" />
            <p>wind {weatherCountry?.wind.speed} m/s</p>
        </>
    )
}

export default Weather