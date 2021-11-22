const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");
var ObjectId = require("mongodb").ObjectID;

const HttpError = require("../models/http-errors");
const User = require("../models/user");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/auction");
const auction = require("../models/auction");

const findPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong!", 500));
  }

  if (!place)
    return next(new Error("Could not find a place with given place id.", 404));

  res.json({ place: place.toObject({ getters: true }) });
};

const findPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (error) {
    return next(new HttpError("Couldn't get place data. Try agin later.", 500));
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0)
    return next(
      new HttpError("Could not find auction with provided user.", 404)
    );

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    next(new HttpError("Invalid inputs passed, please check your inputs!"));

  const { title, description, amount, creator, end_time } = req.body;
  if (end_time < Date.now()) {
    return next(new HttpError("End time can not be in past!", 400));
  }

  let user;
  try {
    user = await User.findById(ObjectId(creator));
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong!", 500));
  }

  if (!user || user.length === 0)
    return next(new HttpError("User with provided id does not exist!", 404));

  const createdPlace = new Place({
    title,
    description,
    image: req.file.path,
    amount,
    creator: creator,
    start_time: Date.now(),
    end_time: end_time,
    bids: [],
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.auctions.push(createdPlace);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Creating auction failed! Please try again!", 500)
    );
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      new HttpError("Invalid inputs passed, please check your inputs!", 422)
    );

  const { title, description, end_time, start_time, price } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not fetch data with given auction id!", 500)
    );
  }

  if (price) {
    return next(new HttpError("You are not allowed to edit price", 401));
  }

  if (place.creator.toString() !== req.userData.userId)
    return next(
      new HttpError("You are not allowed to perform this action", 401)
    );

  if (end_time < Date.now()) {
    place.isShow = false;
  }

  place.title = title;
  place.description = description;
  place.address = address;
  place.start_time = start_time;
  place.end_time = end_time;

  try {
    await place.save();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Couldn't update auction, try again later!", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not load data with given auction id", 500)
    );
  }

  if (!place || place.length === 0)
    return next(new HttpError("Couldn't find auction with provided id", 404));

  if (place.creator.id.toString() !== req.userData.userId)
    return next(new HttpError("You are not allowed to delete", 401));

  const imagePath = place.image;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not delete auction", 500));
  }

  fs.unlink(imagePath, (error) => console.log(error));

  res.status(200).json({
    message: "Auction Deleted",
    placeId: place.id,
  });
};

const postBid = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    next(new HttpError("Invalid inputs passed, please check your inputs!"));

  const { userId, amount, placeId } = req.body;

  let user;
  try {
    user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("User with provided id not found!", 400));
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }

  const newBid = {
    userId,
    amount,
    status: "pending",
  };

  let auction;
  try {
    auction = await Place.findById(placeId);
    if (!auction) {
      return next(new HttpError("Auction with provided id not found!", 400));
    }

    if (auction.end_time <= Date.now()) {
      return next(new HttpError("Auction Closed!", 400));
    }

    if (amount <= auction.amount) {
      return next(
        new HttpError(
          "Bid amoount must be greater than minimum bid amount!",
          400
        )
      );
    }

    for (let i = 0; i < auction.bids.length; i++) {
      if (JSON.stringify(auction.bids[i].userId) === JSON.stringify(userId)) {
        return next(
          new HttpError("You have already bid with this product!", 400)
        );
      }
    }

    auction.bids.push(newBid);

    await auction.save();

    res.status(201).json({ bid: newBid });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const validateAuctions = async (req, res, next) => {
  let auctions;
  try {
    auctions = await Place.find();

    for (let i = 0; i < auctions.length; i++) {
      const maxAmount = Math.max.apply(
        Math,
        auctions[i].bids.map(function (o) {
          return o.amount;
        })
      );

      if (auctions[i].end_time <= Date.now()) {
        let winner;
        auctions[i].bids.forEach((bid) => {
          if (bid.amount == maxAmount) {
            winner = bid;
          }
          auctions[i].isShow = false;
          auctions[i].winner = winner;
          if (auctions[i].winner) auctions[i].isSold = true;
        });
      }

      await auctions[i].save();
    }
    console.log("Auctions Validated!");
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.findPlaceById = findPlaceById;
exports.findPlacesByUserId = findPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.postBid = postBid;
exports.validateAuctions = validateAuctions;
