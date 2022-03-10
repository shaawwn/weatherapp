import React, { useState, useEffect} from 'react';
import { parseCurrentWeather, parseSevenDay } from './data-parsing';
import {getCityName, getCities} from './parse_city_names';
import SearchBar from './components/search/search'
import WeatherDetails from './components/weather-details'
import style from './style.css';

// import background images
import DayClear from './images/Backgrounds/day/day-clear.jpg';
import MorningClear from './images/Backgrounds/dawn/dawn-clear.jpg';
import DuskClear from './images/Backgrounds/dusk/dusk-clear.jpg';
import NightClear from './images/Backgrounds/night/night-clear.jpg';
// getCityName()
const OPENWEATHER_API = process.env.REACT_APP_OPENWEATHER_API

function App(props) {
  const [currentWeather, setCurrentWeather] = useState() // Honolulu as default
  const [weekForecast, setWeekForecast] = useState({})
  const [loadWeatherContainer, setLoadWeatherContainer] = useState(false)
  const [searchBarLoc, setsearchBarLoc] = useState(false)
  const [backgroundImg, setbackgroundImg] = useState(DayClear)
  console.log("Current weather in app.js", currentWeather)
  // Make OPENWEATHER API call in app

  // function getCityName(cityname) {
  //   //Given a city name, retrieve the city IDs from the CSV, then prompt the user to clarify which city
  // }
  function checkKeyUp() {
    const locationInput = document.getElementsByName('search-weather-input')[0]
    console.log(locationInput, "location inpute")
    locationInput.addEventListener('keyup', () => {
      console.log("Keyup")
    })
  }

  function openWeatherAPICall() {
    // Make the actual API call to open weather, which will be used for the app state
  
    let location = document.getElementsByName('search-weather-input')[0].value
    let cityList = getCities(location)

    if(cityList.length > 1) {
      console.log("Please choose from these cities: ", cityList.forEach(city => {
        console.log(city.id, city.name, city.state, city.country)
      }))
    }

    // Before fetching, if there are multiple locations with same name, prompt user to specify which location
    // then make the api call with the city ID insteadf of {location}
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${props.weatherapi}`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      let currentWeather = parseCurrentWeather(data)
      console.log("Current Weather", currentWeather)
      console.log("Returned Data", data)
      console.log(parseSevenDay())
    })
  }
  // checkKeyUp()


  function fetchWeatherData(event, base=false) {
    const dropdown = document.querySelector('.dropdown')
    const cityID = event.target.getAttribute('cityid')
    // console.log("event", event.target.getAttribute('cityid'))
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&APPID=${OPENWEATHER_API}`) // weatherapi is api key
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      let weather = parseCurrentWeather(data)
      console.log("Weather in function", weather)
      setCurrentWeather(weather)
      dropdown.style.display = 'none';
    })
}

function changeBackground(weatherTime, sunrise, sunset) {
  // change the background image depending on weather and time of day
  // Morning/dawn (within 1 of sunrise)
  if(weatherTime < sunrise - 1 || weatherTime > sunrise + 1) {
    return MorningClear
  }
  // Day (after after 1 hour sunrise, before 1 hour sunset)
  else if(weatherTime > sunrise + 1 || weatherTime < sunset - 1) {
    return DayClear
  }

  //Dusk ( within 1 hour of night)
  else if(weatherTime < sunset - 1 || weatherTime > sunset + 1) {
    return DuskClear
  }

  //Night (after 1 hour sunset)
  else if(weatherTime > sunset + 1 || weatherTime < sunrise - 1) {
    return NightClear
  }

  return MorningClear
}
  useEffect(() => {
    // set current weather data here
    if(currentWeather !== undefined) {
      setLoadWeatherContainer(true)
    }
    const currentBackground = changeBackground()
    let body = document.body;
    // console.log("Body", body.style.backgroundImage)
    body.style.backgroundImage = `url(${currentBackground})`;
  }, [currentWeather])

  return(
    <div className="main">
      <SearchBar onclick={openWeatherAPICall} functions={fetchWeatherData} position={searchBarLoc}/>
      {loadWeatherContainer
      ? <WeatherDetails weather={currentWeather} />
      :<span></span>}
      {/* Testing below */}
      {/* <button onClick={openWeatherAPICall}>openWeather</button> */}
    </div>
  )
}


export default App;
