import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const newRecord = {name: newName, number: newNumber}

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already in the phonebook!`)
        } else {
            personService
                .create(newRecord)
                .then(returnedPersons => {
                    setPersons(persons.concat(returnedPersons))
                })
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNewName = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        // console.log(event.target.value)

        setFilteredPersons(
            persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        )
    }

    const personsToShow = filteredPersons.length > 0 ? filteredPersons : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} />

            <h2>Add a new person</h2>
            <PersonForm {...{ addName, newName, handleNewName, newNumber, handleNewNumber }} />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App