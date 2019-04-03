require("custom-env").env("local");

var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

var express = require("express");
var router = express.Router();
// console.log('start', client.messages
// .create)

/* GET home page. */
router.post("/get-otp", (req, res, next) => {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+919782897321", // Text this number
      from: "+15005550006", // From a valid Twilio number
    })
    .then(message => {
    //   console.log(message);
      res.status(200).json({ message: message });
    })
    .catch(error => {
      console.log(error);
      res.status(error.status).json(error);
    });
});

module.exports = router;
