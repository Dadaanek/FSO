import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "./components/Search";
import Countries from "./components/Countries";


const App = () =>  {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const hook = () => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                console.log('fulfilled')
                setCountries(response.data)
            })
    }
    useEffect(hook, [])

    const handleSearch = event => {
        setSearch(event.target.value)
    }

    const buttonF = (country) => {
        return function() {
            const searchC = country.name.common.toLowerCase()
            setSearch(searchC)
        }
        // console.log('x')
    }

    return (
        <>
            <Search handleEvent={handleSearch} />
            <Countries countries={countries} searchValue={search} buttonF={buttonF}/>
        </>
    )
}

export default App