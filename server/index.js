"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static("public"));

// MongoDB database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Initialize GCal-specific interface helpers
  const calendarHelpers = require('./business/gcal-helpers.js');
  // Initialize MongoDB-specific interface helpers
  const dataHelpers = require("./business/data-helpers.js")(db, calendarHelpers);
  // Initialize REST endpoints
  const businessRoutes = require("./business")(dataHelpers);
  app.use("/api/business", cors(), businessRoutes);

  app.get("/", (req, res) => {
    console.log('Get at "/"')
    res.json({ body: "GET at '/'"})
  })

  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
});
