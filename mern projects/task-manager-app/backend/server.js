const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//routes
app.get("/", (req, res) => {
  res.send("HELLO");
  console.log("hello");
});

const PORT = process.env.PORT || 3999;

const startServer = async () => {
  try {
    //connect DB first
    await mongoose.connect(process.env.MONGO_URI);
    //connecting server second
    app.listen(PORT, () => {
      console.log(`server is listening to ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
