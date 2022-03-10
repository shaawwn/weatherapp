//Given a city name when searching for weather, parse out all city name matches
// and give the user option to choose which city they mean (for ambiguos names)

function getCityName(cityID) {
    console.log(cityID)
    const city_names = require('./city.list.json')
    let result = city_names.filter(obj => {
        // console.log("Object", obj.id) // 4975802 Portland ME id
        return obj.id === cityID
    })
    console.log("REsult", result)
    return result[0].state
}

function getCityObjects() {
    const cities = require('./city.list.json');
    return cities
}
function getCityNamesAndIDs(cityName) {
    // get both the city names and the IDs
    const cityAndID = require('./city.list.json');
    let result = cityAndID.filter(obj => {
        // console.log(obj)
        return obj.name === formatCityName(cityName)
    })

    return result
}
function getCities(cityName) {
    // Return the city objects from a matched city name ('Portland' returns all city objects with the name 'Portland', etc)
    const city_names = require('./city.list.json');
    let result = city_names.filter(obj => {
        return obj.name === formatCityName(cityName);
    })
    return result
}

function formatCityName(cityName) {
    // Format city name to match object values in JSON daya
    // console.log("CITY NAME FORMAT", cityName, typeof cityName)
    // if(typeof cityName === 'string') {
    //     console.log("Cityname is string")
    //     let rawName = cityName.split(" ") 
    // } else {
    //     console.log("City name is object")
    //     let rawName = cityName
    // }
    let rawName = cityName.split(" ")
    let formattedName = []
    rawName.forEach(name => {
        formattedName.push(name.slice(0,1).toUpperCase() + name.slice(1))
    })
    return formattedName.join(" ")
}

function getCityNamesOnly() {
    //Return an array of JUST city names
    // City List is an ARRAY OF OBJECTS, get JUST CITY NAMES
    const rawCities = require('./city.list.json')
    // console.log(rawCities)
    let cityNames = []
    rawCities.forEach(city => {
        cityNames.push(city.name)
    })
    // console.log("CITY NAMES", cityNames)
    return cityNames
    // return Object.keys('./city.list.json')
}

function getPartialCityList(cityList, cityName) {
    // Return a partial list of city names based on cityname input to narrow down the number of regex searches
    // ie as soon as regex starts, only use cities that match the regex, Portland should immediately start searching P
    // Instead of ALL cities
    console.log("partial list formatting", cityList, cityName)
    // const allCities = getCityNamesOnly(); // instead of loading all city names here, use as argument so it doesn't
        // need to load this everytime function is called
    let formattedName = formatCityName(cityName)
    const cityRe = new RegExp('^'+formattedName)
    // console.log(cityRe, typeof cityRe)
    let partialCityList = [];

    // allCities.forEach(city => {
    cityList.forEach(city => {
        if(city.match(cityRe) != null) {
            // match returns: [ 'por', index: 5, input: 'Raasepori', groups: undefined ]
            partialCityList.push(city)
        }
    })
    // console.log("PARTIAL LIST", partialCityList)
    return partialCityList
    
}

function matchCityToId() {
    // match city names to all matching JSON and city objects from the original CSV
    // ie 'Portland' should match with all objects that have the city name Portland, and then get the correct IDs
}
// regex against the city names, use Portland array from above as example
    // if(toMatch.length > 2) {
    //     let matches = []
    //     // console.log("Ready to match", toMatch.join(""))
    //     const re = new RegExp(formatCityName(toMatch.join(""))); // re is INCLUDED IN search, not hard equality ie por should match portland

    //     // portland.forEach(city => {
    //     portland.forEach(city => {
    //         // console.log("CITY", city)
    //         console.log(city.match(re))
    //         if(city.match(re) != null) {
    //             // For first match, should then RESET the city names to check using just matches
    //             matches.push(city)
    //         }
    //     })
function testPath() {
    console.log("Correctly linking path")
}
export { getCityName, getCities, formatCityName, getCityNamesOnly, getPartialCityList, testPath, getCityNamesAndIDs, getCityObjects }