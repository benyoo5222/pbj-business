"use strict";

const express = require('express');
const businessRoutes = express.Router();
const stripeHelpers = require('./stripe-helpers.js')

const returnJson = function(res, err, data) {
  if (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  } else {
    res.json(data)
  }
}

module.exports = function(dataHelpers, calendarHelpers) {

  businessRoutes.get('/', (req, res) => {
    // res.json({ message: "get '/' from businessRoutes" })
    dataHelpers.readAllBusinesses((err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.get('/:id', (req, res) => {
    dataHelpers.readBusiness(req.params.id, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.put('/:id', (req, res) => {
    dataHelpers.updateBusiness(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.get('/:id/services', (req, res) => {
    dataHelpers.readServices(req.params.id, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.put('/:id/services', (req, res) => {
    dataHelpers.updateServices(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.post('/:id/transactions', (req, res) => {
    dataHelpers.createTransaction(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.get('/:id/appointments', (req, res) => {
    dataHelpers.getCalendarEvents(req.params.id, (err, data) => {
      returnJson(res, err, data)
    })
  })

  businessRoutes.post('/:id/appointment', (req, res) => {
    // Pay with stripe if token is present
    if (req.body.data.stripeData.token) {
      stripeHelpers.requestStripePayment(req.body.data)
    }
    dataHelpers.createCalendarEvent(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })
  //----------stuff jeff did----------------------
  businessRoutes.put('/:id/hours', (req, res) => {
    dataHelpers.updateHours(req.params.id, req.body.data, (err, data) => {
      returnJson(res, err, data)
    })
  })

  return businessRoutes
}