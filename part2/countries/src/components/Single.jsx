import countryService from '../services/countries'

const Single = ({ country }) => {
    countryService
        .getSingle(country.name.common)
        .then(response => {
            console.log(response)
        })

    return (
        <div>
            <h2>{country.name.common}</h2>

            <p>
                Capital: <b>{country.capital[0]}</b><br />
                Area: <b>{country.area} smq.</b>
            </p>

            <h3>Languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([index, language]) => {
                    return (<li key={index}>{language}</li>)
                })}
            </ul>

            <div style={{ marginTop: '30px' }}>
                <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    style={{ width: '200px', height: 'auto' }}
                />
            </div>
        </div>
    )
}

export default Single