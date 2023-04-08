//https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max&current_weather=true&timeformat=unixtime



export function getWeather() {
    return axios.get(
        //"https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max&current_weather=true&timeformat=unixtime", 
       // "https://api.openweathermap.org/data/2.5/weather?q={London}&appid={7bafe6af3ee919cb06d13efd38ae670d}",
       "https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=7bafe6af3ee919cb06d13efd38ae670d",
        { 
            params: {
            //q: city
            
            },
        }
    ).then(({data}) => {
        return {
            current: parseCurrentWeather(data)
            //daily: parseDailyWeather(data),
           // hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({current_weather}) {
    const {temperature: currentTemp} = current_weather
    return{
        currentTemp: Math.round(currentTemp) 
    }
}

