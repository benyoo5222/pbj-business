"use strict";

const express = require('express');
const businessRoutes = express.Router();

module.exports = function(dataHelpers) {

  businessRoutes.get('/', (req, res) => {
    // res.json({ message: "get '/' from businessRoutes" })
    dataHelpers.readAllBusinesses((err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  businessRoutes.post('/', (req, res) => {

  })

  return businessRoutes
}