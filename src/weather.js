//import axios from "axios"

//https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max&current_weather=true&timeformat=unixtime

export function getWeather(lat,lon,timezone) {
    return axios.get(
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max&current_weather=true&timeformat=unixtime", 
        { 
            params: {
            latitude: lat,
            longitude: lon,
            timezone: timezone
            },
        }
    )
}