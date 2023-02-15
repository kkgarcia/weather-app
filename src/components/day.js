export const createDay = (weekday, iconURL, high, low) => {
    const day = document.createElement('div');
    day.classList.add('day')

    const weekD = document.createElement('p');
    weekD.textContent = weekday

    const icon = document.createElement('div');
    icon.classList.add('weather-icon')
    icon.style.backgroundImage = iconURL

    const highTemp = document.createElement('span');
    highTemp.textContent =`${high}\u00B0`;

    const lowTemp = document.createElement('span');
    lowTemp.classList.add('low');
    lowTemp.textContent = `${low}\u00B0`

    day.append(weekD, icon, highTemp, lowTemp)

    return day
}