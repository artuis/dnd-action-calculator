const express = require("express");
const router = express.Router();
const db = require("../models")
var nodemailer = require('nodemailer');

function sendEmail(email) {
    


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dndcompanionapp@gmail.com',
    pass: 'Nodemail20'
  }
});

var mailOptions = {
  from: 'dndcompanionapp@gmail.com',
  to: `${email}`,
  subject: 'Your account has been successfully created!',
  text: 'Thank you for creating an account! Please enjoy making a campagin and creating characters!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendEmail;