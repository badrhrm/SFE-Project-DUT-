const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");
const { contactUs } = require("../controllers/contactController");

router.post("/", authentication, contactUs);

module.exports = router;
