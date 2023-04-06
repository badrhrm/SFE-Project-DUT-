class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); //calling parent constructor
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
