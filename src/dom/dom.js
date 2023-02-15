import getDefaultWeather from "../api/weather";
import getWeather from "../api/search";
import { format } from 'date-fns';
import { fetchAll, getAirPollution } from "../api/search";
import { createDay } from "../components/day";

const mainDiv = document.querySelector('.main-weather');
const mainUnit = document.querySelector('.units')
const input = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const mainIcon = document.querySelector('.main-weather-icon');
const descrip = document.querySelector('.description');
const location = document.querySelector('.location');
const dayTime = document.querySelector('.day-time');
const right = document.querySelector('.right')
const unitsTab = document.querySelectorAll('.unit')
const dayWrapper = document.querySelector('.day-wrapper')

//highlights
const pressure = document.querySelector('.pressure')
const wind = document.querySelector('.wind')
const rise = document.querySelector('.rise-time')
const set = document.querySelector('.set-time')
const humidity = document.querySelector('.humidity')
const visibility = document.querySelector('.visibility')
const airIndex = document.querySelector('.quality')
const airDecs = document.querySelector('.air-desc')


//default

let currentCity;
let currentUnit = 'metric';

renderWeather('minsk', currentUnit);

async function renderWeather(city, unit) {
    const data = await fetchAll(city, unit)
    const weather = await data[0]
    const forecast = await data[1]

    const airPollution = await getAirPollution(weather.coord.lat, weather.coord.lon)

    dayWrapper.innerHTML = '';
    
    console.log(weather);

    if (weather.cod === '404') {
        console.log(weather.message);
        alert(weather.message);
        return;
    }

    mainUnit.textContent = currentUnit === 'metric' ? '\u2103' : '\u2109'

    currentCity = weather.name;
    console.log('Current city:  ' + currentCity)

    const date = new Date(weather.dt * 1000);

    dayTime.textContent = format(date, 'EEEE, p');

    let icon = weather.weather[0].icon;

    mainIcon.style.backgroundImage = `url('../src/assets/icons/${icon}.svg')`;

    descrip.textContent = weather.weather[0].description.toUpperCase();

    mainDiv.textContent = Math.round(weather.main.temp);

    location.textContent = `${weather.name}, ${weather.sys.country}`;

    for (let i = 7; i < forecast.list.length; i += 8) {
        const dt = new Date(forecast.list[i].dt * 1000);

        const icon = forecast.list[i].weather[0].icon;

        const weekday = format(dt, 'EE');
        const imgURL = `url('../src/assets/icons/${icon}.svg')`;
        const high = Math.round(forecast.list[i].main.temp_max)
        const low = Math.round(forecast.list[i].main.temp_min)

        const day = createDay(weekday, imgURL, high,
            low)
        dayWrapper.append(day)
    }

    pressure.textContent = `${weather.main.pressure} hPa`
    wind.textContent = `${Math.round(weather.wind.speed)} m/sec`

    const sunrise = new Date(weather.sys.sunrise * 1000)
    const sunset = new Date(weather.sys.sunset * 1000)
    rise.textContent = format(sunrise, 'p')
    set.textContent = format(sunset, 'p')

    humidity.textContent = `${weather.main.humidity} %`

    visibility.textContent = `${weather.visibility / 1000} km`

    airIndex.textContent = airPollution.list[0].main.aqi
    switch (airPollution.list[0].main.aqi) {
        case 1:
            airDecs.textContent = 'Good'
            break;
        case 2:
            airDecs.textContent = 'Fair'
            break;
        case 3:
            airDecs.textContent = 'Moderate'
            break;
        case 4:
            airDecs.textContent = 'Poor'
            break;
        case 5:
            airDecs.textContent = 'Very Poor'
            break;
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!input.validity.valid || !input.value) {
        input.reportValidity();
        return;
    }
    renderWeather(input.value, currentUnit);
})

unitsTab.forEach( unit => {
    unit.addEventListener('click', (e) => {
        
        if (e.target.value === currentUnit) return;
        renderWeather(currentCity, e.target.value);
        
        currentUnit = e.target.value;        
    })
})