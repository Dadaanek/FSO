import { useState } from 'react'
import Search from "./components/Search";
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const changePersons = (event) => {
        event.preventDefault()

        if (persons.find(obj => obj.name === newName || obj.number === newNumber) === undefined) {
            const nameObj = {
                    name: newName,
                    number: newNumber,
                    id: persons[persons.length - 1].id + 1
                }
                setPersons(persons.concat(nameObj))
            }
        else {
            window.alert(`This name or number was already added to phonebook.`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Search handleEvent={handleSearchValue} />
            <h2>add a new</h2>
            <PersonForm changePersons={changePersons} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} />
            <h2>Numbers</h2>
            <Persons personsArr={persons} searchValue={searchValue}/>
        </div>
    )
}

export default App