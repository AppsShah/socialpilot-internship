const axios = require("axios")

const HttpError = require("../models/http-errors")

const API_KEY = "AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA"

const getCoordsForAddress = async (address) => {
    // const response = await axios.get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         address
    //     )}&key=${API_KEY}`
    // );
    // const data = response.data

    // if (!data || data.status === 'ZERO_RESULTS') {
    //     throw new HttpError("Could not find location for the specified address", 422)
    // }

    // console.log(data)
    // const coordinates = data.results[0].geometry.location;

    const coordinates = {
        lat: 21.1702,
        lng: 72.8311
    }

    return coordinates
}

module.exports = getCoordsForAddress