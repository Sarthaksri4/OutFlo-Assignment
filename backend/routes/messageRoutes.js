const express = require("express");
const { generateMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/generate", generateMessage);

module.exports = router;
