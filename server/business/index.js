"use strict";

const express = require('express');
const cors = require('cors')
const businessRoutes = express.Router();

const returnJson = function(res, err, data) {
  if (err) {
    res.status(500).json({ error: err.message })
  } else {
    res.json(data)
  }
}

module.exports = function(dataHelpers) {

  businessRoutes.get('/', cors(), (req, res) => {
    // res.json({ message: "get '/' from businessRoutes" })
    dataHelpers.readAllBusinesses((err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.get('/:id', cors(), (req, res) => {
    dataHelpers.readBusiness(req.params.id, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.put('/:id', cors(), (req, res) => {
    dataHelpers.updateBusiness(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.get('/:id/services', cors(), (req, res) => {
    dataHelpers.readServices(req.params.id, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.put('/:id/services', cors(), (req, res) => {
    dataHelpers.updateServices(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.post('/:id/transactions', cors(), (req, res) => {
    dataHelpers.createTransaction(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  return businessRoutes
}