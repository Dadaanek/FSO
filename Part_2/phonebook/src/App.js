import { useState } from 'react'


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

        // if (persons.find(obj => JSON.stringify(obj) === JSON.stringify({name: newName})) === undefined) {
        if (persons.find(obj => obj.name === newName || obj.number === newNumber) === undefined) {
            const nameObj = {
                    name: newName
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
            <div>
                filter shown with<input onChange={handleSearchValue}/>
            </div>
            <h2>add a new</h2>
            <form onSubmit={changePersons}>
                <div>
                    name: <input onChange={handleNameChange} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => {
                    if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        return (
                            <li key={person.name}>{person.name} {person.number}</li>
                        )
                    }
                }
                )}
            </ul>
        </div>
    )
}

export default App