const Filter = ({handleSearch}) => {
    return (
        <>
            Find countries
            <input style={{margin: '0 0 10px 10px'}} onChange={handleSearch} />
        </>
    )
}

export default Filter