const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must enter the name"],
    maxlength: 30,
    minlength: 2,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "must enter the gmail"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "must enter the password"],
    minlength: 6,
  },
});

//this syntax provided by mongo
//this.password refers to only password in this file
UserSchema.pre("save", async function () {
  //this can be done inside register controller
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  //this can be done inside register controller
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  //this can be done inside register controller
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
