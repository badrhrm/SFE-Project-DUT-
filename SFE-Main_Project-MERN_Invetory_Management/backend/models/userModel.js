const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name."],
    },
    email: {
      type: String,
      required: [true, "Please add an email."],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password."],
      minLength: [6, "Your password should be longer than 6 characters."],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo."],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+212",
    },
    bio: {
      type: String,
      maxLength: [250, "Password must not be more than 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving it to DB
userSchema.pre("save", async function (next) {
  // if we want to edit any property in userModel like editing phone number in profile, this function of rehashing password will run so have to make a check to disallow rehashing the password if the password was not modified
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
