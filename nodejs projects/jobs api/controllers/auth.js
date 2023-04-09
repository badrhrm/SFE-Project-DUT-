const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
//const {BadRequestError} = require("../errors");

const register = async (req, res) => {
  // if not using mongo validator (required :true) then i must add this + import Error class:
  //const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("You must provide the name, email and password");
  // }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user }); //201
  //res.send("register use");
};

const login = async (req, res) => {
  res.send("login use");
};

module.exports = {
  register,
  login,
};
