const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=fb3912a580e44fc6bc1170616251011&q=${city}`

// only show icon on cards that specified city 

const getWeather = async (e) => {
    try {
    const result = await fetch(BASE_URL)
    if (!result.ok) throw new Error('Unable to find weather')
    const responseWeatherData = await result.json()
    icon.innerHTML = `<img src="${responseWeatherData.current.condition.icon}" alt="Weather icon">`;
} catch (error) {
    console.error(error.message)
}
}

export { getWeather }