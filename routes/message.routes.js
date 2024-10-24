const express = require("express");
const {sendMessage, getMessages} = require("../controllers/message.controller.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const router = express.Router();

router.post("/send/:id",isAuthenticated,sendMessage);
router.get("/:id",isAuthenticated,getMessages);

module.exports = router;
