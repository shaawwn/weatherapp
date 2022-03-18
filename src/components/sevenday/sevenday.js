// Container for seven day forecast with elements for single days
import React from 'react';
import uniqid from 'uniqid'
import style from './sevenday.css';
import {convertUTC, getDay, kToF, sum} from '../../data-parsing.js'

function SingleDay(props) {
    // single day forecast card for seven day forecast
    // console.log("Single day forecast object", props.forecast)
    // getDay(props.forecast.dt)
    
    // props.forecast to get dt/sunrise/sunset/minmax temo
    // props.forecast.weather to get id (weather type) and weather icon // need to grab the icon

    // convert temp to F
    // convery DT to string of day

    return (
        <div className="single-day">
            <h2>{getDay(props.forecast.dt)}</h2>
            {/* <h1>{props.forecast.weather.icon}</h1>    */}
            <img src={`http://openweathermap.org/img/wn/${props.forecast.weather[0].icon}@2x.png`} />
            <div className="high-low">
                <p>{kToF(props.forecast.temp.max)}°</p>
                <p>/</p>
                <p>{kToF(props.forecast.temp.min)}°</p>
            </div>
        </div>
    )
}
function SevenDay(props) {
    console.log("Seven day forecast", props.forecast)
    return (
        <div className="forecast-container">
            {props.forecast.map(day => {
                return <SingleDay key={uniqid()} forecast={day}/>
            })}
        </div>
    )
}

export default SevenDay