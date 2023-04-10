const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      //here we made the created job related to a user
      type: mongoose.Types.ObjectId,
      ref: "User", //referencing that the id is related to User model
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true } //to add createdAt and updatedAt properties to our DB
);

module.exports = mongoose.model("Job", JobSchema);
