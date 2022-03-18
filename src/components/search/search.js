import React, {useState, useEffect, useRef} from 'react';
import {getCityName, getCities, formatCityName, getCityNamesOnly, getPartialCityList, getCityNamesAndIDs, getCityObjects} from '../../parse_city_names';
import Dropdown from '../dropdown'
import Node from '../../matchnode';

function SearchBar(props) {
    // props.cityMatches, props.setCityMatches instead
    // console.log("PROPS", props)
    const [userInput, setUserInput] = useState([]) // return to empty array for original
    // const [cityMatches, setCityMatches] = useState(props.cityMatches) // Use matched city object to get name/lat/lon for api call
    const [loadDropdown, setLoadDropdown] = useState(false)
    const [matchHistory, setMatchHistory] = useState([])

    // console.log("This is city matches top level", props.cityMatches)
    function cityMatch(toMatch, backspace=false) {
        // given a string toMatch, return array of possible city objects 
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
                    props.setCityMatches(matchHistory[matchHistory.length - 1])
                }
                setLoadDropdown(true)
            }
        } else {
            if(toMatch.length > 1) {
                let matches = []
                const re = new RegExp(formatCityName(toMatch.join("")))
                props.cityMatches.forEach(city => {
                    // console.log("City object", city)
                    if(city.name.match(re) != null) {
                        matches.push(city)
                    }
                })
                props.setCityMatches(matches);
                // console.log("City matches", matches)
                // Use an array to store the history of searches
                setMatchHistory(
                    matchHistory => [...matchHistory, matches]
                )
                setLoadDropdown(true)
            } 
        }
    }

    function handleKeyUp(event) {
        // user enters keys in search input, set the userinput on key up, builds a string to use for cityMatch() function
        const currentInput = document.querySelector('.search-input') // This will still think the highlighted text is the userinput
        if(event.nativeEvent.key === 'Backspace') {
            // if userInput > 0, remove a single letter, else do nothing
            if(currentInput.value === '') {
                console.log("Field is empty")
                setUserInput([])
                setLoadDropdown(false)
                props.setCityMatches(getCityObjects()) // resets city matches
            
            }
            else if(userInput.length > 0) {
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
        if(event.nativeEvent.key.match(/[a-z\s]/i) === null) { //  ensures only alpha and spaces as input
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

    function handleMouseUp() {
        // For when a user intends to delete the current city by highlighting the text and writing new city
        // name
        console.log("Lifting the mouse!", window.getSelection().toString())
    }

    useEffect(() => {
        if(matchHistory.length === 0) {
            setLoadDropdown(false)
            props.setCityMatches(getCityObjects())
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
                    onKeyUp={handleKeyUp}
                    onMouseUp={handleMouseUp} />
                <button onClick={props.onclick}>Get Forecast</button>
                {loadDropdown
                ? <Dropdown cityList={props.cityMatches} functions={props.functions} />
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