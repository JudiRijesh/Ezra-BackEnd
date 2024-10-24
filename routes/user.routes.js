const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const {getUsersForSidebar} = require("../controllers/user.controller")

const router = express.Router();

router.get("/",isAuthenticated,getUsersForSidebar)

module.exports = router;