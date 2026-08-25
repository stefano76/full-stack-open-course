const Person = ({person, removeName}) => {
    return (
        <li style={{marginBottom: '.5rem', listStyle: 'none'}}>
            {person.name}: {person.number}
            <button style={{marginLeft: '1rem'}} onClick={removeName}>Delete</button>
        </li>
    )
}

const Persons = ({ persons, removeName }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person
                    key={ person.id ?? person.name.replaceAll(" ", "") }
                    person={person}
                    removeName={() => removeName(person.id)}
                />
            ))}
        </ul>
    )
}

export default Persons