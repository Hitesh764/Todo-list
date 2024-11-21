const express = require("express");
const { registerUser, login, getUser } = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login)

router.get("/getuser", getUser)

module.exports = router;
