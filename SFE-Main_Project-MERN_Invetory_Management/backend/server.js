const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Routes middleware
app.use("/api/v1/users", userRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

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
