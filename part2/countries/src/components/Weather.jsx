const Weather = ({ capital, weather }) => {
    const icon = weather.weather[0].icon
    const description = weather.weather[0].description

    return (
        <div>
            <h2>Current weather in {capital}</h2>
            <p>Temperature: <b>{weather.main.temp} °C</b></p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                    src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                    alt={description}
                    width="75" height="75"
                />
                <span>{description.charAt(0).toUpperCase() + description.slice(1)}</span>
            </p>
            <p>Wind: <b>{weather.wind.speed} m/s</b></p>
        </div>
    )
}

export default Weather