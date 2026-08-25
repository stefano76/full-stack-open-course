import {useState} from 'react'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"

const App = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])

    const addName = (event) => {
        event.preventDefault()

        console.log(newNumber)

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already in the phonebook!`)
        } else {
            setPersons([...persons, {name: newName, number: newNumber}])
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} />

            <h2>Add a new person</h2>
            <PersonForm {...{ addName, newName, handleNewName, newNumber, handleNewNumber }} />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons.length > 0 ? filteredPersons : persons} />

        </div>
    )
}

export default App