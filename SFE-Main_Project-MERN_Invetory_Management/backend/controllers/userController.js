const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Calling the function for Generating the token
  const token = generateToken(user._id);

  // Send the HTTP-only cookie to the client
  res.cookie("token", token, {
    path: "/", //path where cookie will be stored by default "/"
    httpOnly: true, // makes cookie only used by the web server
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none", // because we gonna have diff urls for front and backend
    secure: true, //for https when deployed
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check DB if user exists
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup.");
  }

  // User exists, now Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Calling the function for Generating the token
  const token = generateToken(user._id);

  // Send the HTTP-only cookie to the client
  res.cookie("token", token, {
    path: "/", //path where cookie will be stored by default "/"
    httpOnly: true, // makes cookie only used by the web server
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none", // because we gonna have diff urls for front and backend
    secure: true, //for https when deployed
  });

  if (user && passwordIsCorrect) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout
// to logout(remove token) we have 2 options either delete cookie from frontend or expire the cookie because it contains the token
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Check if a user is logged in (from HTTP only cookie)
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.send(false);
  }
  return res.json(true);
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = user.email;
    user.name = req.body.name || user.name; // if user did not change name then we use old name from DB
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;
    user.photo = req.body.photo || user.photo;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save(); //updating new info to DB

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
};
