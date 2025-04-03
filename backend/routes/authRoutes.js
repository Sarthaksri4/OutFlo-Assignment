const express = require("express");
const { sendOtp, signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
