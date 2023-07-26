const express = require("express");
const router = express.Router();
const {
  validateEmail,
  validatePassword,
} = require("../middleware/user.middleware");

const { 
  createUser, 
  validationUser
} = require("../services/user.services");


router.post("/user/signIn", validateEmail, validatePassword, validationUser);
router.post("/user/signUp", validateEmail, validatePassword,createUser);

module.exports = router;
