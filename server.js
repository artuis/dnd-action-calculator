// *********************************************************************************
// This file is the initial starting point for the Node/Express server.
// *********************************************************************************


// Dependencies
// =============================================================
const express = require("express");
const path = require("path")

const db = require("./models");
const session = require('express-session')
require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory to be served
app.use(express.static("public"));

const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// session
app.use(session({
  secret: "potato",//process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2*60*60*1000
  }
}))

// Routes
// =============================================================
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