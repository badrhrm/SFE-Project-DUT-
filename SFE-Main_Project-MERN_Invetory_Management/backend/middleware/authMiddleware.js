const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authentication = asyncHandler(async (req, res, next) => {
  try {
    // Extracting the Token from the cookie
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get user info (without password) from DB by extracting user id from the token
    const user = await User.findById(verifiedToken.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("No user with specified id");
    }

    // Save user found in DB in request
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = authentication;
