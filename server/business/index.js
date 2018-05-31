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
    dataHelpers.updateBusiness(req.params.id, req.body.data, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  businessRoutes.get('/:id/services', (req, res) => {
    dataHelpers.readServices(req.params.id, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  businessRoutes.put('/:id/services', (req, res) => {
    dataHelpers.updateServices(req.params.id, req.body.data, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  businessRoutes.post('/:id/transactions', (req, res) => {
    dataHelpers.createTransaction(req.params.id, req.body.data, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(data)
      }
    })
  })

  return businessRoutes
}