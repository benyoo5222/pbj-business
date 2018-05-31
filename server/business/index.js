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

  businessRoutes.get('/:id', (req, res) => {
    dataHelpers.readBusiness(req.params.id, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  businessRoutes.put('/:id', (req, res) => {
    console.log('--- Received PUT to /:id')
    console.log(req.body.data)
    dataHelpers.updateBusiness(req.params.id, req.body.data, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })


  return businessRoutes
}