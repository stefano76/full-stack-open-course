import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    // console.log(persons)

    const addName = (event) => {
        event.preventDefault()
        console.log(newName)

        setPersons([...persons, {name: newName}])
        setNewName('')
    }

    const handleNewName = (event) => {
        // console.log(event.target.value)
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