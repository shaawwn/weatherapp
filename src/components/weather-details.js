// Component that holds weather data information and displays it
import React, { useState, useEffect} from 'react';
import style from '../styles/weather-details.css';
import {kToF, kToC, convertUTC, changeTimeFormat, capitolizeWeatherDesc} from '../data-parsing';
import SevenDay from './sevenday/sevenday.js';
function WeatherDetails(props) {
    console.log("Loading weathe details", props)
    // main container for holding and displaying weather data
    // props are object of returned weather data from api call
    // console.log("Weatherdata", props)

    return (
        <div className="weather-details-container">
            <div className="current-weather">
                {props.weather.state
                ?<p className="location-name">{props.weather.name}, {props.weather.state}, {props.weather.country}</p>
                :<p className="location-name">{props.weather.name}, {props.weather.country}</p>
                }
                <p className="current-time">{changeTimeFormat(convertUTC(props.weather.dt, props.weather.timezone))}</p>
                {/* <p className="location-name">{props.weather.name}, {props.weather.state}, {props.weather.country}</p> */}
                {/* <p className="current-temp">{kToF(props.weather.main.temp)}°</p> */}
                <div className="temps">
                    <p className="current-temp">{kToF(props.weather.main.temp)}°</p>
                    <div className="high-lows">
                        <p className="high-low">H: {kToF(props.weather.main.temp_max)}°</p>
                        <p className="high-low">L: {kToF(props.weather.main.temp_min)}°</p>
                    </div>
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${props.weather.icon}@4x.png`} alt={props.weather.description} />
                        <h1>{capitolizeWeatherDesc(props.weather.description)}</h1>
                    </div>
                </div>

                <div className="temp-time-container">
                    <p>Sunrise: {changeTimeFormat(convertUTC(props.weather.sunrise, props.weather.timezone))}</p>
                    <p>Sunset: {changeTimeFormat(convertUTC(props.weather.sunset, props.weather.timezone))}</p>
                </div>
            </div>
            <div className="forecast-container">
                {/* <h1>Put 7 day forecast here!</h1> */}
                {props.sevendayforecast
                ? <SevenDay forecast={props.sevendayforecast} />
                : <span></span>}
            </div>
        </div>
    )
}

export default WeatherDetails