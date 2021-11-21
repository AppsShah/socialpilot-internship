const { validationResult } = require("express-validator")
const mongoose = require("mongoose")
const fs = require("fs")
var ObjectId = require('mongodb').ObjectID;

const HttpError = require("../models/http-errors");
const User = require("../models/user")
const getCoordsForAddress = require('../util/location');
const Place = require("../models/auction")

const findPlaceById = async (req, res, next) =>
{

    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId)
    } catch (error) {
        console.log(error)
        return next(new HttpError("Something went wrong!", 500))
    }

    if (!place) return next(new Error("Could not find a place with given place id.", 404))

    res.json({ place: place.toObject({ getters: true }) })
}

const findPlacesByUserId = async (req, res, next) =>
{
    const userId = req.params.uid;
    let userWithPlaces;

    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (error) {
        return next(new HttpError("Couldn't get place data. Try agin later.", 500))
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) return next(new HttpError("Could not find auction with provided user.", 404))

    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) })
}

const createPlace = async (req, res, next) =>
{
    console.log("running this function ")
    const errors = validationResult(req)
    console.log(req.body.creator)

    if (!errors.isEmpty()) next(new HttpError("Invalid inputs passed, please check your inputs!"))

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        console.log(error)
        return next(error);
    }

    let user;
    try {
        user = await User.findById(ObjectId(creator))
    } catch (error) {
        console.log(error)
        return next(new HttpError("Something went wrong!", 500))
    }

    if (!user || user.length === 0) return next(new HttpError("User with provided id does not exist!", 404))

    const createdPlace = new Place({
        title,
        description,
        location: coordinates,
        image: req.file.path,
        price:req.body.address,
        creator: creator
    });

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace)
        await user.save({ session: sess })
        sess.commitTransaction()
    } catch (error) {
        console.log(error)
        return next(new HttpError("Creating auction failed! Please try again!", 500))
    }

    res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) =>
{
    const errors = validationResult(req)

    if (!errors.isEmpty()) return next(new HttpError("Invalid inputs passed, please check your inputs!", 422))

    const { title, description } = req.body
    const placeId = req.params.pid

    let place;

    try {
        place = await Place.findById(placeId)
    } catch (error) {
        console.log(error)
        return next(new HttpError("Could not fetch data with given auction id!", 500))
    }

    // if (place.creator.toString() !== req.userData.userId) return next(new HttpError("You are not allowed to perform this action", 401))

    place.title = title
    place.description = description

    try {
        await place.save()
    } catch (error) {
        console.log(error)
        return next(new HttpError("Couldn't update auction, try again later!", 500))
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })
}

const deletePlace = async (req, res, next) =>
{
    const placeId = req.params.pid

    let place;
    try {
        place = await Place.findById(placeId).populate("creator")
    } catch (error) {
        console.log(error)
        return next(new HttpError("Could not load data with given auction id", 500))
    }

    if (!place || place.length === 0) return next(new HttpError("Couldn't find auction with provided id", 404))
//   if (place.creator.id.toString() !== req.userData.userId) return next(new HttpError("You are not allowed to delete", 401))

    const imagePath = place.image
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await place.remove({ session: sess })
        place.creator.places.pull(place)
        await place.creator.save({ session: sess })
        sess.commitTransaction()
    } catch (error) {
        console.log(error)
        return next(new HttpError("Could not delete auction", 500))
    }

    fs.unlink(imagePath, (error) => console.log(error))

    res.status(200).json({
        message: "Auction Deleted", placeId: place.id
    })
}

exports.findPlaceById = findPlaceById
exports.findPlacesByUserId = findPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace