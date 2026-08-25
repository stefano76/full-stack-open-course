const CountryList = ({ countries }) => {
    return (
        <ul>
            {
                countries.map(country => (
                    <li key={country.name.common.replaceAll(" ", "")}>
                        {country.name.common}
                    </li>
                ))
            }
        </ul>
    )
}

export default CountryList