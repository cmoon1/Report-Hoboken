const mongoCollections = require('../config/mongoCollections');
const reports = mongoCollections.reports;
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

// const options = {
//     provider: 'google',
//     apiKey: process.env.PUBLIC_GOOGLE_MAPS_API_KEY,
// };

const options = {
    provider: 'google',
    apiKey: "AIzaSyAhZeQMjAh8mqi1L-PLzhQhAZpWrITuWO0"
};

const geocoder = NodeGeocoder(options);

let validString = (input) => {
    if(typeof input !== 'string' || input.trim().length === 0)
        return false;
    return true;
};

let validDate = (date) => {
    let currDay = new Date();
    let dd = String(currDay.getDate()).padStart(2, '0');
    let mm = String(currDay.getMonth() + 1).padStart(2, '0');
    let yyyy = currDay.getFullYear();
    let properFormat = mm + '/' + dd + '/' + yyyy;
    if(properFormat === date.trim())
        return true;
    return false;
};

//everything is a string
//date: MM/DD/YYYY format

//        !!! might need further error checking for address (make sure it is in Hoboken) !!!

let createReport = async (name, date, address, issueType, description) => {
    if(!name || !date || !address || !issueType || !description)
        throw "missing fields!";

    if(!validString(name) || !validString(date) || !validString(address) || !validString(issueType) || !validString(description))
        throw "invalid string inputs";
        
    if(!validDate(date.trim()))
        throw "invalid date given";

    //more error checking for address will go here
    let formatAddress = address.trim() + ", " + "Hoboken";
    
    let retVal = await geocoder.geocode({
        address: formatAddress
    });

    //check if the address is valid by checking if the geocoder returns the passed street number
    let retStNum = retVal[0].streetNumber;
    if(!retStNum)
        throw "invalid street address";

    const reportCollection = await reports();

    let newReport = {
        name: name.trim(),
        date: date.trim(),
        latitue: retVal[0].latitude,
        longitude: retVal[0].longitude,
        issueType: issueType.trim(),
        description: description.trim()
    };

    const insertReport = await reportCollection.insertOne(newReport);

    if(insertReport.insertedCount === 0)
        throw "report could not be added!";
    
    
    //code to parse ObjectId to string (might not need for these were for the labs in 546)
    // let restaurantId = newRestaurant["_id"].toString();
    // newRestaurant["_id"] = restaurantId;

    return newReport;
};

let getAll = async () => {
    const reportCollection = await reports();
    const reportArr = await reportCollection.find({}).toArray();

    //code to parse ObjectId to string (might not need for these were for the labs in 546)
    // let currRestaurant = {};
    // let restaurantId = "";
    // for(i = 0; i < restaurantArr.length; i++) {
    //     currRestaurant = restaurantArr[i];
    //     restaurantId = currRestaurant["_id"].toString();
    //     currRestaurant["_id"] = restaurantId;
    // }

    return reportArr;
};

module.exports = {
    createReport,
    getAll
};