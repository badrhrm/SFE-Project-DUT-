const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // if not using mongo validator (required :true) then i must add this + import Error class:
  //const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("You must provide the name, email and password");
  // }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); //here we can just send the token but we wanted to also send the name so we can displayed it like "hello name" //StatusCodes.CREATED = 201
  //res.send("register use");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //not needed since we have mongo validation for email and password but we in postman we get an empty err so we added this so we can use error class to add context to our err returned in postman
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // checking if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
