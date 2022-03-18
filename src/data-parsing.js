// Functions for parsing weather data
import {getCityName} from './parse_city_names';
function parseCurrentWeather(data) {
  console.log("Parsing data", data)
    // From the returned API data, parse into weather data
    // object to be used by APP
    // console.log("Importing from seperate file", data)
    const currentWeatherData = {
      "id": data.weather[0].id, // This is the weather data code (ie 600 = 'cloudy')
      "description": data.weather[0].description,
      "icon": data.weather[0].icon, 
      "main": data.main,
      // "wind": getWindData(data.wind),
      "clouds": data.clouds, // I think this is a measure of cloudcoverage
      "country": data.sys.country,
      "state": getCityName(data.id), // Use city id with city list to get state, if any
      "sunrise": data.sys.sunrise, // in seconds, why are sunrise and sunset reversed?
      "sunset": data.sys.sunset,
      "timezone": data.timezone, // UTC
      "dt": data.dt,
      "name": data.name,
    //   "coord":{"lon":-0.1257,"lat":51.5085}
      "coord": data.coord
    }
    return currentWeatherData
  }

function kToF(temp) {
  // Kelvin to fahrenheit
  return(Math.round((temp - 273.15) * 9/5 + 32))
}   

function kToC(temp) {
  // kelvin to celsius
  return(Math.round((temp) - 273.15))
}

function convertUTC(utcValue, timezoneOffset) {
  // timeFormat as 12 or 24 hour time, converts UTC value to one of those
  // utc in seconds -> minutes -> hours -> days
  const adjustedTimestamp = (utcValue + timezoneOffset) * 1000
  // console.log("Adjusted", adjustedTimestamp, utcValue, timezoneOffset)
  let newDate = new Date(adjustedTimestamp);
  // console.log("LOCAL", formatAMPM(newDate))
  newDate = newDate.toUTCString();
  console.log("New date", newDate)
  return newDate.split(' ')[4].split(":").slice(0,2).join(":")
}

function changeTimeFormat(timeToConvert) {
  // console.log("Time to convert", timeToConvert.slice(0, 2))
  // convert a time string in 24 hour format into 12 hour format
  let adjustedTime;
  if(timeToConvert.slice(0,2) >= 12) {
      // Subtract 12
      if(timeToConvert.slice(0,2) == 12) {
        adjustedTime = 12
      } else {
        adjustedTime = timeToConvert.slice(0,2) - 12
      }
      // let adjustedTime = timeToConvert.slice(0,2) - 12
      timeToConvert = timeToConvert.split("")
      timeToConvert.splice(0, 2, adjustedTime.toString())
      timeToConvert.push('pm');
      // console.log("Time to convert after", timeToConvert)
      return timeToConvert.join("")
  } else {
      // remove leading 0
      timeToConvert = timeToConvert.split("");
      if(timeToConvert[0] === '0') {
        // remove leading 0
        timeToConvert.splice(0, 1, '');
      } // maintain leading digit if not 0 (10, or 11 am)
      timeToConvert.push('am');
      // console.log("Time to convert pre", timeToConvert)
      return timeToConvert.join("")
  }
}   
function parseSevenDay(data) {
    // Parse data from the returned 7 day forecast data
    console.log("Parsing seven day")
    const sevenDayForecast = {
        "forecast": "Its gone rain"
    }

    return sevenDayForecast
}

function capitolizeWeatherDesc(weatherDesc) {
  // capitolize the weather description from open weather api call

  // console.log("Weather description:", weatherDesc, weatherDesc.split(" "))
  let formattedDesc = []
  weatherDesc.split(" ").forEach(word => {
    let formattedWord = word.slice(0, 1).toUpperCase() + word.slice(1)
    formattedDesc.push(formattedWord)
  })
  return formattedDesc.join(" ")
}

function getDay(dateObject) {
  // return the day of week as a string from dateObject
  let newDate = new Date(dateObject * 1000);
  // console.log("LOCAL", formatAMPM(newDate))
  newDate = newDate.toUTCString();
  // console.log("From getDay", newDate.slice(0, 3))
  return newDate.slice(0, 3)
}
function sum(a, b) {
    return a + b
}
export { getDay, parseCurrentWeather, parseSevenDay, kToF, kToC, convertUTC, changeTimeFormat, capitolizeWeatherDesc, sum }