// *********************************************************************************
// This file is the initial starting point for the Node/Express server.
// *********************************************************************************


// Dependencies
// =============================================================
var express = require("express");
const path = require("path")

var db = require("./models");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory to be served
app.use(express.static(path.join(__dirname,"/public")));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Starts the server to begin listening
// =============================================================
db.sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});