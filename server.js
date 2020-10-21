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
app.use(express.static("public"));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require('./controllers/apiroutes')(app);
require("./controllers/htmlroutes.js")(app);
// Routing
const weaponRoutes = require("./controllers/weaponcontroller");
app.use("/api/weapons",weaponRoutes);

const raceRoutes = require("./controllers/racecontroller");
app.use("/api/races",raceRoutes);

const accountRoutes = require("./controllers/accountcontroller");
app.use("/api/accounts",accountRoutes);

const spellRoutes = require("./controllers/spellcontroller");
app.use("/api/spells",spellRoutes);

const classRoutes = require("./controllers/classcontroller");
app.use("/api/classes",classRoutes);

const campaignRoutes = require("./controllers/campaigncontroller");
app.use("/api/campaigns",campaignRoutes);

const characterRoutes = require("./controllers/charactercontroller");
app.use("/api/characters",characterRoutes);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});