import {useEffect, useState} from "react";
import countryService from '../services/countries'
import weatherService from '../services/weather'
import Weather from './Weather'

const Single = ({ country }) => {
    const [weather, setWeather] = useState([]);

    countryService
        .getSingle(country.name.common)
        .then(response => {
            console.log(response)
        })

    useEffect(() => {
        weatherService
            .getWeather(country)
            .then(response => {
                setWeather(response[0]) // Weather object inside data
            })
            .catch(error => {
                console.log(error)
                setWeather([])
            })
    }, [country])

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

            { weather.length > 0 && <Weather capital={country.capital[0]} weather={weather} /> }
        </div>
    )
}

export default Single