const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const { connect } = require("mongoose");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.Port || 3000; //if port is set in env then use it, if not then 3000 is the port
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
