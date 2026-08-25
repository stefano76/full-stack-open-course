import {useState, useEffect} from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import LongList from './components/LongList'
import Single from './components/Single'

function App() {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        countryService
            .getAll()
            .then(allCountries => {
                // console.log(allCountries)
                setCountries(allCountries)
            })
    }, [])



    const handleSearch = (event) => {
        console.log(event.target.value)

        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        // console.log(filteredCountries)
        setFiltered(filteredCountries)
    }


    return (
        <>
            <h1>Countries</h1>

            Find countries
            <input style={{margin: '10px'}} onChange={handleSearch} />

            {
                filtered.length > 10 ? <LongList /> :
                filtered.length > 1 ? <CountryList countries={filtered} /> :
                filtered.length === 1 && <Single country={filtered[0]} />
            }
        </>
    )
}

export default App
