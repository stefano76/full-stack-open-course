import {useState, useEffect} from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import LongList from './components/LongList'
import Single from './components/Single'
import Filter from "./components/Filter"
import Loading from "./components/Loading"

function App() {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [showSingle, setShowSingle] = useState(false)

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

        setShowSingle(false)

        setFiltered(
            countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        )
    }

    const handleShowSingle = (country) => {
        setFiltered(country)
        setShowSingle(true)
    }

    return (
        <>
            <h1 style={{ marginBottom: 20 }}>Countries</h1>

            { countries.length > 0 ? <Filter handleSearch={handleSearch} /> : <Loading /> }

            {
                filtered.length > 10 ? <LongList /> :
                filtered.length > 1 ? <CountryList countries={filtered} handleShowSingle={handleShowSingle} /> :
                filtered.length === 1 && <Single country={filtered[0]} />
            }

            { showSingle && <Single country={filtered} /> }
        </>
    )
}

export default App
