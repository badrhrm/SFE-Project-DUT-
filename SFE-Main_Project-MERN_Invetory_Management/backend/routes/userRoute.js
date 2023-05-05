const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
} = require("../controllers/userController");
const authorization = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", authorization, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", authorization, updateUser);
router.patch("/changepassword", authorization, changePassword);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
