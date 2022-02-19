import React, { useState, useEffect} from 'react';
import { parseCurrentWeather, parseSevenDay } from './data-parsing';
import {getCityName, getCities} from './parse_city_names';
import SearchBar from './components/search/search'
// getCityName()
function App(props) {
  const [currentWeather, setCurrentWeather] = useState({})
  const [weekForecast, setWeekForecast] = useState({})
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
  return(
    <div>
      <SearchBar onclick={openWeatherAPICall}/>

      {/* Testing below */}
      <button onClick={openWeatherAPICall}>openWeather</button>
    </div>
  )
}


export default App;
