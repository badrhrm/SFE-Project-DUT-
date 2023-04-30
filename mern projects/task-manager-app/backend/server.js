const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoute");

//express middle to get json data (req,body) from req from header of URL
app.use(express.json());

//calling the router so we can access the routes i did set up
app.use("/api/v1/tasks", taskRoutes);
// app.use(taskRoutes);

//routes
app.get("/", (req, res) => {
  res.send("HELLO");
  console.log("hello");
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
