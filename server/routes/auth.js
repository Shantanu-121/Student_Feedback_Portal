const { sendotp, signup, login } = require("../controllers/auth");
const express = require("express");
const app = express();
const router = express.Router();

router.post("/sendotp",sendotp);

router.post("/login", login);

router.post("/signup",signup);

module.exports = router ; 
