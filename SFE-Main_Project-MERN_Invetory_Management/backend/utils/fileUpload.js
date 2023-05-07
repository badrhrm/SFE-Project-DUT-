const multer = require("multer");

// Defining file storage
const storage = multer.diskStorage({
  //location where to store files, full path is set in server.js with path module
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  //name of the file to be stored
  filename: (req, file, cb) => {
    const uniquePrefix = new Date().toISOString().replace(/:/g, "-"); //adding date to original file name as a suffix but instead of 5/7/2023, u get 5-7-2023.
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

// Specify the type of files that can be saved
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// File Size Formatter function (has nothing to do with multer library)
// copy pasted, could not understand it nor do i have enough time to waste on it since school project deadlines are close
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = { upload, fileSizeFormatter };
