import React, {useState, useEffect} from 'react';
import {parseCurrentWeather, parseSevenDay } from '../data-parsing'
import style from './search.css';
import uniqid from 'uniqid';

const OPENWEATHER_API = process.env.REACT_APP_OPENWEATHER_API

function Dropdown(props) {

    // Click a city name in the drop down to perform a fetch/search of the city
    if(props.cityList === undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="dropdown">
            {props.cityList.map(city => {
                if(city.state === '') {
                    return <p key={uniqid()} cityid={city.id} className='dropdown-item' onClick={props.functions}>{city.name}, {city.country}</p>
                } else {
                    return <p key={uniqid()} cityid={city.id} className='dropdown-item' onClick={props.functions}>{city.name}, {city.state}, {city.country}</p>

                }
            })}
        </div>
    )
}

export default Dropdown