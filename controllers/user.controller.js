var mongoose = require('mongoose');
var sms = require('./sms.controller.js');
var userModel = require('../models/user.model');
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
  },
  register: function(req, res, next){
    var newUser = new userModel({
     password: req.params.info.split("-")[0],
     number: req.params.info.split("-")[1],
     isLoggedIn: true,
   });
   console.log(req.params.info.split("-")[1]);
   console.log(newUser.password + " " + newUser.number);
   userModel.findOne({'number': req.params.info.split("-")[1]}, function(err, user){
     if(err){throw err;}
     if(user){
       console.log("no already exists");
       res.json({success: false,
                 message: "number already exists"});
     }
     else{
       newUser.save(function(err, user){
         if(err){
           res.json({success: false, message: "unknown error"});
           throw err;
         }
         else{
           console.log("saved new user");
           res.json({success: true});
         }
       });
     }
   });
 },
 login: function(req, res, next){
   var user = {
     password: req.params.info.split("-")[0],
     number: req.params.info.split("-")[1]
   };
   userModel.findOne({'password': user.password, 'number': user.number}, function(err, user){
     if(err){throw err;}
     if(user){
       res.json({success: true});
       console.log("logged in");
     }
     else{
       res.json({success: false,
                 message: "credentials don't match"});
     }
   });
 },
 resetPasswordOtp: function(req, res, next){
  var number = req.params.info.split("-")[0];
  var otp = req.params.info.split("-")[1];
  userModel.findOne({'number': number}, function(err, user){
    if(err){throw err;}
    if(user){
      sms.sendOTP(number, otp, res);
    }
    else{
      res.json({success: false,
                message: "no such number"});
    }
  });
 },
 changePassword: function(req, res, next){
   var password = req.params.info.split("-")[0];
   var number = req.params.info.split("-")[1];
   userModel.update({ number: number },{password: password }, function(err, user){
    if(err){throw err;}
    if(user){
      res.json({success: true});
    }
    else{
      res.json({success: false, message: "unknown error occured try again later"});
    }
  });
 }
};
