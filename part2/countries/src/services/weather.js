import axios from "axios";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org'
const urlWeather = `${baseUrl}/data/2.5/weather?`;
const urlIcon = `${baseUrl}/payload/api/media/file/`;

/*
* EXAMPLES
* Weather: https://api.openweathermap.org/data/2.5/weather?q=London,GB&appid={API key}
* Icon: https://openweathermap.org/payload/api/media/file/10d@2x.png
*/

const getWeather = (country) => {
    const capital = country.capital[0]
    const code = country.cca2
    const request = axios.get(`${urlWeather}q=${capital},${code}&units=metric&appid=${apiKey}`);
    return request.then(response => response.data);
}

const getIcon = (icon) => {
    return `${urlIcon}${icon}@2x.png`;
}

export default { getWeather, getIcon }