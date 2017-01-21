var express = require('express');
var router = express.Router();
var user = require("./controllers/user.controller");
var cors = require('cors');
var items = require("./controllers/items.controller");
module.exports = function(app){
  app.use(cors());
  app.get("/otp/:info/", user.sendOTP); //phone-otp
  app.get("/register/:info/", user.register); //password-number
  app.get("/login/:info", user.login); //password-number
  app.get("/resetpassword/:info", user.resetPasswordOtp); ///number-otp
  app.get("/changepass/:info", user.changePassword); //password-number
  app.get("/search/:info", items.search); //search string
  app.get("/list/:info", items.get); //get subcategory
  app.use(router);
};
