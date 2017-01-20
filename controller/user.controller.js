var mongoose = require('mongoose');
var sms = require('./sms.controller.js');
var userModel = require('../models/user.model');
//var is   = require('type-is');
module.exports = {
  sendOTP: function(req, res, next){
    console.log("request");
    //console.log(req);
    console.log(req.ip);
    var phone = req.params.info.split("-")[0];
    var otp = req.params.info.split("-")[1];
    console.log(phone + " " + otp);
    //res.json({success: true});
    sms.sendOTP(phone, otp, res);
  }
};
