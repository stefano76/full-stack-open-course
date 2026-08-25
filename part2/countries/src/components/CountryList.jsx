const CountryList = ({ countries, handleShowSingle }) => {
    return (
        <ul>
            {
                countries.map(country => (
                    <li style={{ padding: "5px 0" }} key={country.name.common.replaceAll(" ", "")}>
                        {country.name.common}
                        <button style={{marginLeft: 10}} onClick={() => handleShowSingle(country)}>Show</button>
                    </li>
                ))
            }
        </ul>
    )
}

export default CountryList