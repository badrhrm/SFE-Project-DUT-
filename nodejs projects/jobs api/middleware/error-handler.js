//const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

//usually when we have specific errors we use the the children classes (bad-request & not-found & unauthenticated) of custom error since we can have their specific HTTP status
//while other errors use just the general HTTP status of 500, and return a big error object called {err} that is not user frienly to easily know what went wrong

// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   }
//   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }); //500
// };

//instead of returning {err} with general HTTP status 500, we cam get more specific with these other errors that dont use the chldren classes (bad-request & not-found & unauthenticated) of custom error
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default // here it is like custom error class tho this way it allows us to be more specefic with other errors
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, //internal=500
    msg: err.message || "Something went wrong try again later",
  };

  //for those specific errors we used : return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  //this line of code allows us to see the error object that includes the property of the error and its value so we can add it as a condition

  // in postman (register user method) i registered with an already registered email to produce this error then use that line of code (return...{err}) to be able to know the value of the error so i can put it into a condition
  if (err.code && err.code === 11000) {
    //this is what postman shows for this error : "err": {"keyValue": {"email":"...@gmail.com"}}  so we try to access the key and the value of keyValue (key :"email" & value : "...@gmail.com")
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} : (${Object.values(err.keyValue)}), please choose another value`;
    customError.statusCode = 400;
  }

  // in postman (register user method) in body section i removed the email and password and only left the name... (next steps were same as previous condition)
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(" also ");
    customError.statusCode = 400;
  }

  // in postman (get single job method) in url params, i put a job id that does not exist in DB...
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
