import { getWeather } from "./weather.js"

getWeather(46.7,23.59,Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
    console.log(res.data)
})

