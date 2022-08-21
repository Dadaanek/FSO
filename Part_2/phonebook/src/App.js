import { useState, useEffect } from 'react'
import Search from "./components/Search";
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import axios from 'axios'
import personService from './services/personsMethods'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationStyle, setNotificationStyle] = useState('+')

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
                return personService.personDelete(id).then(response => {
                    const deletedPersons = persons.filter(person => {
                        return person.id !== id
                    })
                    setPersons(deletedPersons)
                    setNotificationMessage(`${currentPerson.name} deleted`)
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                    .catch(error => {
                        setNotificationStyle('-')
                        setNotificationMessage(`${currentPerson.name} not found`)
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
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
            id: persons.length > 0 ? persons[persons.length - 1].id + 1 : persons[persons.length]
        }

        if (personName !== undefined) {
                if (window.confirm(`${personName.name} is already defined, do you want to rewrite ${personName.number}?`))
                {
                    personService.personUpdate(personName.id, nameObj).then(response => {
                        setPersons(persons.map(el => {
                            return el.id === personName.id ? response : el
                        }))
                        setNewNumber('')
                        setNewName('')
                        setNotificationMessage(`${personName.name}'s number changed to ${newNumber}.`)
                    })
                        .catch(error => {
                            setNotificationStyle('-')
                            setNotificationMessage(`${personName.name} not found`)
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
                    setNewNumber('')
                    setNewName('')
                    setNotificationMessage(`${personNumber.name} changed to ${newName}.`)

                })
                    .catch(error => {
                        setNotificationStyle('-')
                        setNotificationMessage(`${personNumber.name} not found`)
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
                    setNotificationMessage(`Added ${nameObj.name}`)
                })
        }
        setTimeout(() => setNotificationMessage(null), 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} positivity={notificationStyle}/>
            <Search handleEvent={handleSearchValue} />
            <h2>add a new</h2>
            <PersonForm nameValue={newName} numberValue={newNumber} changePersons={changePersons} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} />
            <h2>Numbers</h2>
            <Persons personsArr={persons} searchValue={searchValue} handleClick={handleDeletePerson}/>
        </div>
    )
}

export default App