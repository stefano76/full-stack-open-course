import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '01-2345-6789'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

    const Number = ({person}) => {
        return (
            <li>{person.name}: {person.number}</li>
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <div>name: <input value={newName} onChange={handleNewName}/></div>
                    <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
                    <div>
                        <button type="submit">Add new person</button>
                    </div>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <Number key={person.name.replaceAll(" ", "")} person={person}/>
                ))}
            </ul>
        </div>
    )
}

export default App