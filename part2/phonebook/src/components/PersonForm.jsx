const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                    name:
                    <input
                        value={props.newName}
                        onChange={props.handleNewName}
                        name="name"
                    />
                </div>
                <div>
                    number:
                    <input
                        value={props.newNumber}
                        onChange={props.handleNewNumber}
                        name="number"
                    />
                </div>
                <div><button type="submit">Add</button></div>
            </div>
        </form>
    )
}

export default PersonForm