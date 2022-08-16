import axios from "axios";
import {useState, useEffect} from "react";
import Weather from "./Weather";

const FirstCountry = ({object}) => {
    console.log(object)

    const languages = []
    for (let key in object.languages) {
        languages.push(object.languages[key])
    }

    return (
        <div>
            <h1>{object.name.common}</h1>
            <p>capital {object.capital[0]}</p>
            <p>area {object.area}</p>
            <h2>languages</h2>
            <ul>
                {languages.map(lang => <li key={languages.indexOf(lang)}>{lang}</li>)}
            </ul>
            <img src={object.flags.png} alt="country flag"/>
            <Weather countryCapital={object.capital[0]} />
        </div>
    )
}

const Countries = ({ countries, searchValue, buttonF }) => {

    const filteredCountries = countries.filter(country => {
        const countryName = country.name.common.toLowerCase()
        const containSearch = searchValue.toLowerCase()
        return countryName.includes(containSearch)
    })

    return (
        <ul>
            {filteredCountries.length === 1 ? <FirstCountry object={filteredCountries[0]} />
                : filteredCountries.length <= 10
                    ? filteredCountries.map(country => {
                        return (
                            <li key={country.area} >
                                <span>{country.name.common}<button onClick={buttonF(country)}>show</button></span>
                            </li>
                        )
                    })
                    : filteredCountries.length !== 250
                        ? "Too many matches, specify another filter"
                        : ''}
        </ul>
    )
}

export default Countries