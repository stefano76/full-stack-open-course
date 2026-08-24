import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([...persons])

    const addName = (event) => {
        event.preventDefault()

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

    const Number = ({person}) => {
        return (
            <li>{person.name}: {person.number}</li>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>Filter shown names: <input onChange={handleSearch}/></div>

            <h2>Add a new person</h2>
            <form onSubmit={addName}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <div>name: <input value={newName} onChange={handleNewName}/></div>
                    <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
                    <div>
                        <button type="submit">Add</button>
                    </div>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {filteredPersons.map((person) => (
                    <Number key={person.id} person={person}/>
                ))}
            </ul>
        </div>
    )
}

export default App