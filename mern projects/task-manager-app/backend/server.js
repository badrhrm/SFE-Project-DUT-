const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

//express middle to get json data (req,body) from req from header of URL
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("HELLO");
  console.log("hello");
});

//middleware
const logger = (req, res, next) => {
  console.log("middleware");
  console.log(req.method);
  next();
};

app.post("/api/v1/tasks", logger, async (req, res) => {
  console.log("tasks");
  console.log(req.body);
  res.send("task created");
});

const PORT = process.env.PORT || 3777;

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

// //2nd method to connect db and server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`server is listening to ${PORT}...`);
//     });
//   })
//   .catch((error) => console.log(error));
