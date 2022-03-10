import React, {useState, useEffect, useRef} from 'react';
import {getCityName, getCities, formatCityName, getCityNamesOnly, getPartialCityList, getCityNamesAndIDs, getCityObjects} from '../../parse_city_names';
import Dropdown from '../dropdown'
import Node from '../../matchnode';

function SearchBar(props) {
    const [userInput, setUserInput] = useState([])
    const [cityMatches, setCityMatches] = useState(getCityObjects())
    const [loadDropdown, setLoadDropdown] = useState(false)
    const [matchHistory, setMatchHistory] = useState([])

    function cityMatch(toMatch, backspace=false) {
        // Instead of array of City names only, search the array of city objects
        // format = {id: 1, name: Portland, State: "OR", etc}
        if(backspace === true) {
            if(toMatch.length > 1) {
                // Go back an element for each letter removed with backspace
                matchHistory.pop()
                setMatchHistory(
                    matchHistory => [...matchHistory]
                )
                if(matchHistory.length === 0) {
                    console.log("Back at the begining")
                } else {
                    // Can set cityMatches to empty array which is no bueno
                    setCityMatches(matchHistory[matchHistory.length - 1])
                }
                setLoadDropdown(true)
            }
        } else {
            if(toMatch.length > 1) {
                let matches = []
                const re = new RegExp(formatCityName(toMatch.join("")))
                cityMatches.forEach(city => {
                    if(city.name.match(re) != null) {
                        matches.push(city)
                    }
                })
                setCityMatches(matches);
                // Use an array to store the history of searches
                setMatchHistory(
                    matchHistory => [...matchHistory, matches]
                )
                setLoadDropdown(true)
            } 
        }
    }

    function handleKeyUp(event) {
        if(event.nativeEvent.key === 'Backspace') {
            // if userInput > 0, remove a single letter, else do nothing
            if(userInput.length > 0) {
                // Set new matched city array
                let newUserInput = userInput.slice(0, userInput.length - 1)
                // Expand the list again as user removes letters
                cityMatch(newUserInput, true) // Sets new city matches in this function
                setUserInput(newUserInput)
            } else {
                console.log("Nothing to remove")
                return false
            }
            return false;
        }
        if(event.nativeEvent.key.match(/[a-z\s]/i) === null) { // spaces also count!
            // ensure only alphabet characters work
            return false
        }
        setUserInput(
            userInput.concat(event.nativeEvent.key)
        )
        cityMatch(userInput)
    }

    function testSelect(event) {
        if(window.getSelection) {
            console.log("Selecting", window.getSelection())
        }
    }

    useEffect(() => {
        if(matchHistory.length === 0) {
            setLoadDropdown(false)
            setCityMatches(getCityObjects())
        }
    }, [userInput])

    return ( // searchbar has two positions, default for blank searches, and for when there is data displayed
        <div className="searchbar-container">
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
                ? <Dropdown cityList={cityMatches} functions={props.functions} />
                : <span></span>
                }
            </div>
        </div>
    )
}



export default SearchBar




// Tests
// These were used as dummy data 
    // const portland = [
    //     "Portland",
    //     "Portsmouth",
    //     "Portersville",
    //     "Portmouth",
    //     "Portlanzibar"
    //     // "Portland, ME", 
    //     // "Portland, OR"
    // ]

    // const testCities = [
    //     {
    //         "id": 1,
    //         "name": "Portland",    // const portland = [
    //     "Portland",
    //     "Portsmouth",
    //     "Portersville",
    //     "Portmouth",
    //     "Portlanzibar"
    //     // "Portland, ME", 
    //     // "Portland, OR"
    // ]

    // const testCities = [
    //     {
    //         "id": 1,
    //         "name": "Portland",
    //         "state": "OR"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Portland",
    //         "state": "ME"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Portsmouth",
    //         "state": ""
    //     },
    //     {
    //         "id": 4,
    //         "name": "Polk",
    //         "state": "OR"
    //     },
    // ]
    //         "state": "OR"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Portland",
    //         "state": "ME"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Portsmouth",
    //         "state": ""
    //     },
    //     {
    //         "id": 4,
    //         "name": "Polk",
    //         "state": "OR"
    //     },
    // ]