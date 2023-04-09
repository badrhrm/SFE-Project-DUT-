const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");

//need to test router.route() in here instead of router.post()
router.post("/register", register);
router.post("/login", login);

module.exports = router;
