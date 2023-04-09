const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: string,
    required: [true, "must enter the name"],
    minlength: 2,
    maxlength: 30,
    lowercase: true,
  },
  email: {
    type: string,
    required: [true, "must enter the gmail"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter valid email",
    ],
    unique: true,
  },
  passowrd: {
    type: string,
    required: [true, "must enter the password"],
    minlength: 6,
  },
});
module.exports = mongoose.model("User", UserSchema);
