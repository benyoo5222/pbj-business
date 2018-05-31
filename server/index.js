"use strict";

// Basic express setup:

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI; 

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// MongoDB database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  // The `data-helpers` module provides an interface to the database of tweets.
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:

  const dataHelpers = require("./business/data-helpers.js")(db);


  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  
  const businessRoutes = require("./business")(dataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  
  app.use("/api/business", businessRoutes);

  app.get("/", (req, res) => {
    console.log('Get at "/"')
    res.json({ body: "GET at '/'"})
  })

  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
});
