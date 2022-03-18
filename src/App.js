import React, { useState, useEffect} from 'react';
import { parseCurrentWeather, parseSevenDay, changeTimeFormat, convertUTC } from './data-parsing';
import {getCityName, getCities, getCityObjects} from './parse_city_names';
import SearchBar from './components/search/search'
import WeatherDetails from './components/weather-details'
import style from './style.css';

// import background images
import DayClear from './images/Backgrounds/day/day-clear.jpg';
import MorningClear from './images/Backgrounds/dawn/dawn-clear.jpg';
import DuskClear from './images/Backgrounds/dusk/dusk-clear.jpg';
import NightClear from './images/Backgrounds/night/night-clear.jpg';

const ONE_HOUR = 360000;
const OPENWEATHER_API = process.env.REACT_APP_OPENWEATHER_API
// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,hourly,%20minutely&appid=OPENWEATHER_API
function App(props) {
  const [currentWeather, setCurrentWeather] = useState() // Honolulu as default
  const [weekForecast, setWeekForecast] = useState()
  const [loadWeatherContainer, setLoadWeatherContainer] = useState(false)
  const [searchBarLoc, setsearchBarLoc] = useState(false)
  const [backgroundImg, setbackgroundImg] = useState(DayClear)
  const [searchInput, setSearchInput] = useState([])

  // City matches at the top level
  const [cityMatches, setCityMatches] = useState(getCityObjects())
  // const cityMatchesTopLevel = getCityObjects();
  // console.log("City matches top level", cityMatches)


  function fetchWeatherData(event, base=false) {
    // Passed down to Dropdown component, then called on click
    // Need to get city object data when clicking dropdown option, then using that get lat/lon for city and
    // make fetch that way.
    // console.log("City match in fetchweather", cityMatches[0].coord, cityMatches)
    const lat = cityMatches[0].coord.lat // cityMatches[0] will only fetch the first city, if there's one thats fine, if there's mult its a problem
    const lon = cityMatches[0].coord.lon
    // console.log("City?", cityMatches[0].name)
    // const city = cityMatches[0].name;
    // const country = cityMatches[0
    // console.log("Lat, lon", lat, lon)
    const dropdown = document.querySelector('.dropdown')
    const searchInputField = document.querySelector('.search-input')
    setSearchInput([]) // How tf to pass this to searchbar?
    searchInputField.value = ''; // This clears it but doesn't alter the state of the search 
    const cityID = event.target.getAttribute('cityid')

 
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&APPID=${OPENWEATHER_API}`) // weatherapi is api key
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      console.log("Weather data call: ", data)
      const coords = data.coord
      // console.log("Coordinates", coords)
      let weather = parseCurrentWeather(data)
      // console.log("Weather in function", weather)
      setCurrentWeather(weather)
      dropdown.style.display = 'none';
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&appid=${OPENWEATHER_API}`)
      .then(response => response.json())
      .then(data => {
        console.log("One call data", data)
        setWeekForecast(data.daily)
      })
    })
}

function fetchSevenDay() {
  // ex call: https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=722fa4f411061b4d1c67abdb35712816
  console.log("Seven day")
}

function changeBackground(weatherTime, sunrise, sunset) {
  // change the background image depending on weather and time of day
  const oneHour = 360000 / 100;
  if(currentWeather !== undefined) {
    if((currentWeather.dt > currentWeather.sunrise + oneHour && currentWeather.dt < currentWeather.sunset - oneHour)) {
      // console.log("Day")
      return DayClear
    }
    // Day (after after 1 hour sunrise, before 1 hour sunset)
    else if(currentWeather.dt < currentWeather.sunrise - oneHour || currentWeather.dt > currentWeather.sunset + oneHour) {
      // console.log("Night")
      return NightClear
    }
      //Night (after 1 hour sunset)
    else if(currentWeather.dt > currentWeather.sunset - oneHour && currentWeather.dt < currentWeather.sunset + oneHour) {
      // console.log("Dusk")
      return DuskClear
    }
    
    //Dusk ( within 1 hour of night)
    else if(currentWeather.dt < currentWeather.sunrise - oneHour || currentWeather.dt > currentWeather.sunrise + oneHour) {
      // console.log("Morning")
      return MorningClear
    }
  }
  console.log("Setting default background")
  return MorningClear
}
  useEffect(() => {
    // set current weather data here
    console.log("CUrrent weather state", currentWeather, weekForecast)
    if(currentWeather !== undefined) {
      setLoadWeatherContainer(true) // Currently this never gets set 
    } 
    const currentBackground = changeBackground()
    let body = document.body;
    body.style.backgroundImage = `url(${currentBackground})`;
  }, [currentWeather])

  return(
    <div className="main">
      <SearchBar onclick={() => {console.log("Add button functionality")}} functions={fetchWeatherData} position={searchBarLoc} currentState={searchInput} cityMatches={cityMatches} setCityMatches={setCityMatches}/>
      {loadWeatherContainer
      ? <WeatherDetails weather={currentWeather} sevendayforecast={weekForecast}/>
      :<span></span>}
    </div>
  )
}

export default App;
