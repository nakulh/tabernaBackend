// Twilio Credentials
const accountSid = 'ACa381d66b9e6bf8836825f8196d017544';
const authToken = '27a1a9357771352a0f6a3c1c25ea8950';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
module.exports = {
  sendOTP: function(number, otp, res){
    console.log("sending SMS");
    client.messages.create({
      to: number,
      from: '+16018094048',
      body: 'hi!, your Taberna OTP is ' + otp,
    })
    .then(function(message){
      console.log(message);
      res.json({success: true});
    }, function(err){
      console.log(err);
      res.json({success: false,
                message: "check the number u have entered or try again later"});
    });
  }
};
