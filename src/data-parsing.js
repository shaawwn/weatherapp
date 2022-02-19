// Functions for parsing weather data

function parseCurrentWeather(data) {
    // From the returned API data, parse into weather data
    // object to be used by APP
    console.log("Importing from seperate file")
    const currentWeatherData = {
      "id": data.weather[0].id,
      "description": data.weather[0].description,
      "icon": data.weather[0].icon, 
      "main": data.main,
      // "wind": getWindData(data.wind),
      "clouds": data.clouds, // I think this is a measure of cloudcoverage
      "country": data.sys.country,
      "sunrise": data.sys.sunrise + data.timezone,
      "sunset": data.sys.sunset + data.timezone,
      "timezone": data.timezone, // UTC
      "dt": data.dt,
      "name": data.name,
    //   "coord":{"lon":-0.1257,"lat":51.5085}
      "coord": data.coord
    }
    return currentWeatherData
  }

function parseSevenDay(data) {
    // Parse data from the returned 7 day forecast data
    console.log("Parsing seven day")
    const sevenDayForecast = {
        "forecast": "Its gone rain"
    }

    return sevenDayForecast
}


function sum(a, b) {
    return a + b
}
export { parseCurrentWeather, parseSevenDay, sum }