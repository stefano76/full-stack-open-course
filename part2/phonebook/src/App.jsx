import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const addName = (event) => {
        event.preventDefault()

        if ( persons.find(person => person.name === newName) ) {
            alert(`${newName} is already in the phonebook!`)
        } else {
            setPersons([...persons, {name: newName}])
        }

        setNewName('')
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const Number = ({ person }) => <li>{person.name}</li>

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    <button style={{ marginTop: '1rem' }} type="submit">Add new name</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <Number key={person.name.replaceAll(" ", "")} person={person} />
                ))}
            </ul>
        </div>
    )
}

export default App