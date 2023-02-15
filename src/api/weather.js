export default function getDefaultWeather(divBox) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=metric&appid=e257eb3a07e08bf8ef34436db1293dee', {mode:"cors"})
        .then(function(res) {
            return res.json()
        })
        .then(function(object) { 

            if (object.cod === '404') return

            console.log(object)
            divBox.textContent = `${Math.round(object.main.temp)} \u2103 \u2109`
        })
        .catch(function(err) {
            console.log(err)
        })
}