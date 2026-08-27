import {useEffect, useState} from "react";
import weatherService from '../services/weather'
import Weather from './Weather'

const Single = ({ country }) => {
    const [weather, setWeather] = useState({});
    const [showWeather, setshowWeather] = useState(false);

    useEffect(() => {
        weatherService
            .getWeather(country)
            .then(response => {
                // console.log(response)
                setWeather(response) // Weather object inside data
                setshowWeather(true)
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

            <div style={{ marginTop: 30 }}>
                <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    style={{ width: 150, height: 'auto' }}
                />
            </div>

            { showWeather && <Weather capital={country.capital[0]} weather={weather} /> }
        </div>
    )
}

export default Single