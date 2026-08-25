import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [notification, setNotification] = useState(null)
    const [errorClass, setErrorClass] = useState(false)

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
        const existentPerson = persons.find(person => person.name === newName)

        if (existentPerson) {
            if ( window.confirm(`${newName} is already in the phonebook, do you want to replace the old number?`) ) {
                const changedPerson = { ...existentPerson, number: newNumber }
                personService
                    .update(existentPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setNotification(`${returnedPerson.name}'s number has been updated successfully`)
                        setTimeout(() => setNotification(null), 5000)
                        setPersons(persons.map(person => person.id === existentPerson.id ? returnedPerson : person))
                    })
                    .catch(error => {
                        setErrorClass(true)
                        setNotification(`${newName} was already removed from server`)
                        setTimeout(() => {
                            setNotification(null)
                            setErrorClass(false)
                        },5000)
                        setPersons(persons.filter(person => person.name !== newName))
                    })
            }
        } else {
            personService
                .create(newRecord)
                .then(returnedPerson => {
                    setNotification(`${returnedPerson.name} has been added`)
                    setTimeout(() => setNotification(null), 5000)
                    setPersons(persons.concat(returnedPerson))
                })
        }

        setNewName('')
        setNewNumber('')
    }

    const removeName = (id) => {
        const personName = persons.find(person => person.id === id).name
        if ( window.confirm(`Are you sure you want to delete ${personName}?`) ) {
            personService
                .destroy(id)
                .then(returnedPerson => {
                    setNotification(`${returnedPerson.name} has been removed from server`)
                    setTimeout(() => setNotification(null),5000)
                    setPersons(persons.filter(person => person.id !== returnedPerson.id))
                })
        }
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
            <Notification message={notification} error={errorClass} />

            <Filter handleSearch={handleSearch} />

            <h2>Add a new person</h2>
            <PersonForm {...{ addName, newName, handleNewName, newNumber, handleNewNumber }} />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} removeName={removeName} />
        </div>
    )
}

export default App