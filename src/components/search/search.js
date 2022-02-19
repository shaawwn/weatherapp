import React, {useState, useEffect, useRef} from 'react';
import {getCityName, getCities, formatCityName, getCityNamesOnly, getPartialCityList, getCityNamesAndIDs, getCityObjects} from '../../parse_city_names';
import Dropdown from '../dropdown'

function SearchBar(props) {
    const [userInput, setUserInput] = useState([])
    const [cityMatches, setCityMatches] = useState(getCityObjects())
    // const [cityMatches, setCityMatches] = useState(getCityNamesOnly()) // set state to getCityNamesOnly() initially, refine with user input
    const [loadDropdown, setLoadDropdown] = useState(false)
    const prevCities = useRef()
    // const[testMatches, setTestMatches] = useState(getCityObjects())

    const portland = [
        "Portland",
        "Portsmouth",
        "Portersville",
        "Portmouth",
        "Portlanzibar"
        // "Portland, ME", 
        // "Portland, OR"
    ]

    const testCities = [
        {
            "id": 1,
            "name": "Portland",
            "state": "OR"
        },
        {
            "id": 2,
            "name": "Portland",
            "state": "ME"
        },
        {
            "id": 3,
            "name": "Portsmouth",
            "state": ""
        },
        {
            "id": 4,
            "name": "Polk",
            "state": "OR"
        },
    ]



    // function cityMatch(toMatch) {
    //     // toMatch = city name as user input
    //     // regex against the city names, use Portland array from above as example
    //     // array of cities should update as the city gets more refined, ie DONT search ALL CITIES if user inputs Portland
    //     // after user inputs P, should get new city list with cities starting with P only
    //     // console.log("CITY MATCHES", cityMatches, toMatch)
    //     if(toMatch.length > 2) {
    //         let matches = []
    //         // console.log("Ready to match", toMatch.join(""))
    //         const re = new RegExp(formatCityName(toMatch.join(""))); // re is INCLUDED IN search, not hard equality ie por should match portland

    //         // portland.forEach(city => {
    //         cityMatches.forEach(city => { // Change array to search as input gets more refined
    //             console.log("CITY", city, loadDropdown)
    //             // console.log(city.match(re))
    //             if(city.match(re) != null) {
    //                 // For first match, should then RESET the city names to check using just matches
    //                 matches.push(city)
    //             }
    //         })
    //         console.log("Setting city matches")
    //         setCityMatches(matches)
    //         setLoadDropdown(true)
    //         // for city matches, then create the drop down

    //     } else {
    //         console.log("City name must have at least 3 letters", toMatch.join(""))
    //     }
    // }

    function cityMatch(toMatch, backspace=false) {
        // Instead of array of City names only, search the array of city objects
        // format = {id: 1, name: Portland, State: "OR", etc}
        // if backspace, reset the city match and reverse
        if(backspace === true) {
            // Rerun matches with update(1 letter removed) citynames
            if(toMatch.length > 2) {
                let matches = []
                // console.log("Matches in backspace", matches, toMatch, cityMatches)
                const re = new RegExp(formatCityName(toMatch.join("")))
                cityMatches.forEach(city => {
                    if(city.name.match(re) != null) {
                        matches.push(city)
                    }
                })
                console.log("Setting matches in backspace", matches)
                setCityMatches(matches)
                setLoadDropdown(true)
            }
        } else {
            if(toMatch.length > 2) {
                let matches = []
                const re = new RegExp(formatCityName(toMatch.join("")))
                cityMatches.forEach(city => {
                    if(city.name.match(re) != null) {
                        matches.push(city)
                    }
                })
                setCityMatches(matches);
                setLoadDropdown(true)
            } 
        }

        // console.log("TESTS", testMatches)
    }

    function handleKeyUp(event) {
        // console.log("Key up event", event.nativeEvent.key)
        // Push to userInput state, also return ONLY alphabet keys
        // console.log("KEYUP", event.nativeEvent.key)
        if(event.nativeEvent.key === 'Backspace') {
            // if userInput > 0, remove a single letter, else do nothing
            if(userInput.length > 0) {
                // Set new matched city array
                let newUserInput = userInput.slice(0, userInput.length - 1)
                // Expand the list again as user removes letters
               
                // setCityMatches(getPartialCityList(cityMatches, newUserInput.join("")))
                cityMatch(newUserInput, true)
                setUserInput(newUserInput)
                // cityMatch(newUserInput)
                // console.log( cityMatches)
            } else {
                console.log("Nothing to remove")
                return false
            }
            // console.log("End of function")
            return false;
        }
        if(event.nativeEvent.key.match(/[a-z]/i) === null) {
            // ensure only alphabet characters work
            return false
        }

        setUserInput(
            userInput.concat(event.nativeEvent.key)
        )
        // console.log("Setting city matches in keyup")
        // setCityMatches(getPartialCityList(cityMatches, userInput.join("")))
        // tempCityMatch(userInput)
        cityMatch(userInput)
        // console.log(userInput.join(""))
    }


    function checkDB(inputValue, db) {
        // Dynamically check the input value as a user types and return a city name if there is a partial string match
        console.log(`Checking ${inputValue} against JSON ${JSON.stringify(db)}`)
        db.forEach(entry => {
            console.log(entry.name)
        })
    }

    useEffect(() => {
        // console.log("Updating user input", userInput.join(""))
        if(userInput.length > 3) {
            console.log("Start Dropdown Now")
        }
    }, [userInput])

    return (
        <div className="searchbar">
            <input 
                className="search-input"
                type="text" 
                name="search-weather-input"
                autoComplete="off"
                placeholder="Enter location"
                onKeyUp={handleKeyUp} />
            <button onClick={props.onclick}>Get Forecast</button>
            {loadDropdown
            ? <Dropdown cityList={cityMatches} />
            : <span></span>
            }
            {/* <Dropdown cityList={cityMatches}/> */}
        </div>
    )
}



export default SearchBar