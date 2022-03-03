const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const Role = require("../models/Role");
const Sequelize = require("sequelize");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
var crypto = require("crypto");
const client = require("twilio")(
  "ACaddb23538b864eb961f5f7c3c6d47c52",
  "f6fc1ce15d766005710a64462184b10d"
);
const jwt = require("jsonwebtoken");
const userController = require("../controller/users");
const multer = require("../config/multer");
var {
  passport,
  authAdmin,
  authManager,
  authenticate,
} = require("../auth/passport-auth");
const {
  VerificationAttemptContext,
} = require("twilio/lib/rest/verify/v2/verificationAttempt");


///login User 
router.post("/login", userController.login);

//register 
router.post("/register", userController.register);

//updateUser
router.patch("/updateMe",   passport.authenticate("jwt", { session: false }), userController.Updateuser);

//deletUser
router.delete("/deleteMe",   passport.authenticate("jwt", { session: false }), userController.deleteMe);
///getallusers
router.get("/all",   passport.authenticate("jwt", { session: false }), userController.getAllUsers);

//logout
router.get("/logout", userController.logout);

//getUserbyid
router.get("/:id" ,passport.authenticate("jwt", { session: false }) , userController.GetUserById);


module.exports = router;
