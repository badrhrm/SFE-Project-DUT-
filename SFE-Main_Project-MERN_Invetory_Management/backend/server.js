const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3775;

const startServer = async () => {
  try {
    //connect DB first
    await mongoose.connect(process.env.MONGO_URI);
    //connecting server second
    app.listen(PORT, () => {
      console.log(`Server is listening to port : ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
