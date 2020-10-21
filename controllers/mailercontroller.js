// const express = require("express");
// const router = express.Router();
// const db = require("../models")
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'dndcompanionapp@gmail.com',
//     pass: 'Nodemail20'
//   }
// });

// var mailOptions = {
//   from: 'dndcompanionapp@gmail.com',
//   to: 'dndcompanionapp@gmail.com',
//   subject: 'Your account has been successfully created!',
//   text: 'Thank you for creating an aaccount. Your login is:   and ypur account can be accessed at any time'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// module.exports = mailer;