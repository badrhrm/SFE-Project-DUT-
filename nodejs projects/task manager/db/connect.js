const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("db connected ...");
  return mongoose.connect(url, {
    //might not be needed in v6 of mongo
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
