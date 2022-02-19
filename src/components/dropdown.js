import React, {useState, useEffect} from 'react';
import style from './search.css';
import uniqid from 'uniqid';
function Dropdown(props) {
    // console.log(props.cityList)
    return (
        <div className="dropdown">
            {/* <ul>
                {props.cityList.map(city => {
                    return <li key={city}>{city}</li>
                })}
            </ul> */}
            {props.cityList.map(city => {
                return <p key={uniqid()} className='dropdown-item'>{city.name}, {city.state}</p>
            })}
        </div>
    )
}

export default Dropdown