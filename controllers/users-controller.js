const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../models/http-errors");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not get users details!", 500));
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new HttpError(
        "Invalid Credentials are given. Make sure to give valid credentials"
      )
    );

  const { name, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      new HttpError(
        "Coudn't Create User. Try again.(Coudn't hash password)",
        500
      )
    );
  }

  try {
    hasUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong!", 500));
  }
  if (hasUser)
    return next(new HttpError("Can't create user, email already exists!", 422));

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    auctions: [],
  });
  console.log(req.file);

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Coudn't create user due to non generation of token", 500)
    );
  }
  console.log(createdUser);
  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Couldn't create user", 500));
  }

  res.status(201).json({
    message: "User Created",
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new HttpError(
        "Invalid Credentials are given. Make sure to give valid credentials"
      )
    );

  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong!", 500));
  }

  if (!identifiedUser)
    return next(new HttpError("Email is not registered!", 401));

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (error) {
    return next(new HttpError("Problem in decrypting password", 500));
  }

  if (!isValidPassword) return next(new HttpError("Wrong Password!", 401));

  let token;
  try {
    token = jwt.sign(
      {
        user: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Couldn't login due to non generation of token", 500)
    );
  }

  res.status(200).json({
    message: "Logged In!",
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
