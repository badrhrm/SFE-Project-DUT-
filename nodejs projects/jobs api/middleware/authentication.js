const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes :
    req.user = { userId: payload.userId, name: payload.name }; //here we return what we used to create JWT in its func inside user.js model
    next();
    //other way of doing it is :
    // const user = User.findById(payload.id).select('-password'); //we dont pass on the password by doing "-password"
    // req.user = user;
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
