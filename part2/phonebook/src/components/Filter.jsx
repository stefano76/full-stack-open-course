const Filter = ({ handleSearch }) => {
    return (
        <div>Filter shown names: <input onChange={handleSearch}/></div>
    )
}

export default Filter