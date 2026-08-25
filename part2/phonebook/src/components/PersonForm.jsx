const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>name: <input value={props.newName} onChange={props.handleNewName}/></div>
                <div>number: <input value={props.newNumber} onChange={props.handleNewNumber}/></div>
                <div><button type="submit">Add</button></div>
            </div>
        </form>
    )
}

export default PersonForm