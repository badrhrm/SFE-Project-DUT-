const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");

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
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup.");
  }

  // Validate Request
  if (!req.body.oldPassword || !req.body.password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // User exists, now Check if old password is correct meaning it matches the one in DB
  const oldPasswordIsCorrect = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  // if old password is correct, save new password
  if (user && oldPasswordIsCorrect) {
    user.password = req.body.password;

    await user.save(); //saving user updated info

    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  // option 1:
  // const { email } = req.body;
  // const user = await User.findOne({ email });

  // option 2:
  const user = await User.findOne({ email: req.body.email });
  const oldToken = await Token.findOne({ userId: user._id });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Deleting old  reset token If exists in DB
  // because there is no point in keeping it stored for long since I made them expire in 30min
  // so before we create a fresh reset token, we delete the old one
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reset Token
  let resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: resetToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
  }).save();

  // // Reset url that will be sent in email
  // const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // // Reset Email
  // const message = `
  //     <h1>Hello ${user.name}</h1>
  //     <p>You requested for a password reset</p>
  //     <p>Please use the url below to reset your password</p>
  //     <p>This reset link is valid for only 30minutes.</p>
  //     <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  //     <p>Regards...</p>
  //     <p>Support Team...</p>
  //   `;

  // try {
  //   const subject = "Password Reset Request";
  //   const send_to = user.email;
  //   const sent_from = process.env.EMAIL_USER;

  //   await sendEmail(subject, message, send_to, sent_from);
  //   res.status(200).json({ success: true, message: "Reset Email Sent" });
  // } catch (error) {
  //   res.status(500);
  //   throw new Error("Something went Wrong. Please try again");
  // }
});

const resetPassword = asyncHandler(async (req, res) => {
  // const { resetToken } = req.params;
  // const { password } = req.body;

  // console.log(password);
  // console.log(resetToken);

  // Use resetToken from params to Find resetToken in db so if it works then they are the same
  const userToken = await Token.findOne({
    token: req.params.resetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired token");
  }

  // Change password after finding User using userId stored in Token Model
  const user = await User.findOne({ _id: userToken.userId });
  user.password = req.body.password;
  await user.save();
  res.status(201).json({
    message: "Password Reset Successful, Please Login",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
