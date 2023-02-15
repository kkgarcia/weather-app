export const getAirPollution = (lat, lon) => {

    return fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=e257eb3a07e08bf8ef34436db1293dee`, {mode:"cors"})
        .then(function(res) {
            return res.json()
        })
        .catch(function(err) {
            console.log(err)
        })

}

export const fetchAll = (city='minsk', units='metric') => {
    return  Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=e257eb3a07e08bf8ef34436db1293dee`, {mode:"cors"}),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=e257eb3a07e08bf8ef34436db1293dee`)
    ])
    .then(function(res) {
        const currentWeather = res[0].json()
        const forecast = res[1].json()

        return [currentWeather, forecast]
    })
    .catch(function(err) {
        console.log(err)
    })
}