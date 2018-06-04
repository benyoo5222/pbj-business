"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI; 

const SERVICE_ACCOUNT = require('./service_account_secrets.json')
const { API_KEY } = require('./calendar_secrets.json')

const { google } = require('googleapis')
const calendar = google.calendar({
  version: 'v3',
  // Include API_KEY to prevent `Error: Daily Limit for Unauthenticated Use Exceeded. Continued use requires signup`
  auth: API_KEY
})

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

  // Generate JWT auth client. Very little documentation on this. Do not promisify `.authorize()`
  // http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
  const jwtClient = new google.auth.JWT(
    SERVICE_ACCOUNT.client_email,
    null,
    SERVICE_ACCOUNT.private_key,
    ['https://www.googleapis.com/auth/calendar.readonly']
  ).authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    } else {
      console.log('Successfully authorized Google service account')
    }
  })

  // Initialize GCal-specific interface helpers
  const calendarHelpers = require('./business/gcal-helpers.js')(calendar, jwtClient);
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
