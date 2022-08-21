import { useState, useEffect } from 'react'
import Search from "./components/Search";
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons";
import axios from 'axios'
import personService from './services/personsMethods'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])
    console.log(persons)

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleDeletePerson = (id) => {
        return function() {
            const currentPerson = persons.find(person => person.id === id)
            if (window.confirm(`Do you really want to delete ${currentPerson.name}?`)) {
                const deletedPersons = persons.filter(person => person.id !== id)
                setPersons(deletedPersons)
                return personService.personDelete(id)
            }
        }
    }

    const changePersons = (event) => {
        event.preventDefault()

        const personName = persons.find(obj => obj.name === newName)
        const personNumber = persons.find(obj => obj.number === newNumber)

        const nameObj = {
            name: newName,
            number: newNumber,
            id: persons[persons.length - 1].id + 1
        }

        if (personName !== undefined) {
                if (window.confirm(`${personName.name} is already defined, do you want to rewrite ${personName.number}?`))
                {
                    personService.personUpdate(personName.id, nameObj).then(response => {
                        setPersons(persons.map(el => {
                            return el.id === personName.id ? response : el
                        }))
                    })
                }
            }
        else if (personNumber !== undefined) {
            if (window.confirm(`${personNumber.number} is already defined, do you want to rewrite ${personNumber.name}'s name?`))
            {
                personService.personUpdate(personNumber.id, nameObj).then(response => {
                    setPersons(persons.map(el => {
                        return el.id === personNumber.id ? response : el
                    }))
                    })
            }
        }
        else {
            personService
                .personAdd(nameObj)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewNumber('')
                    setNewName('')
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Search handleEvent={handleSearchValue} />
            <h2>add a new</h2>
            <PersonForm nameValue={newName} numberValue={newNumber} changePersons={changePersons} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} />
            <h2>Numbers</h2>
            <Persons personsArr={persons} searchValue={searchValue} handleClick={handleDeletePerson}/>
        </div>
    )
}

export default App