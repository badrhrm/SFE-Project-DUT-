// this one is just to understand what is a middleware
const logger = (req, res, next) => {
  console.log("middleware is activated.......");
  console.log(req.method);
  console.log(req);
  next();
};
module.exports = { logger };
