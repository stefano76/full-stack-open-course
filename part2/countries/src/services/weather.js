import axios from "axios";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org'
const urlWeather = `${baseUrl}/data/4.0/onecall/current?units=metric&`;
const urlIcon = `${baseUrl}/payload/api/media/file/`;

/*
* EXAMPLES
* Weather: https://openweathermap.org/payload/api/media/file/10d@2x.png
* Icon: https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
*/

const getWeather = (country) => {
    const [lat, lon] = country.capitalInfo.latlng
    const request = axios.get(`${urlWeather}lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return request.then(response => response.data);
}

const getIcon = (icon) => {
    return `${urlIcon}${icon}@2x.png`;
}

export default { getWeather, getIcon }