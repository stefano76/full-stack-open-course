import weatherService from '../services/weather'

const Weather = ({ capital, weather }) => {
    const icon = weatherService.getIcon(weather.weather.icon)

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.temp} °C</p>
            <p>
                <img
                    src={icon}
                    alt={weather.weather.description}
                    style={{ width: 100, height: 'auto', display: 'block', margin: '10px 0' }}
                />
            </p>
            <p>Wind: {weather.wind} m/s</p>
        </div>
    )
}

export default Weather