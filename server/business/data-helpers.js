"use strict";
const ObjectId = require('mongodb').ObjectId
const gCalHelpers = require('./gcal-helpers.js')

module.exports = function makeDataHelpers(db) {
  return {
    createBusiness: function (data, cb) {
      db.collection('businesses').insertOne(data).then(() => {
        cb(null, true)
      })
    },

    readBusiness: function (data, cb) {
      db.collection('businesses').find(ObjectId(data)).toArray().then((business) => {
        cb(null, business)
      })
    },

    readAllBusinesses: function (cb) {
      db.collection('businesses').find({}).toArray().then((data) => {
        cb(null, data)
      })
    },

    updateBusiness: function (id, data, cb) {
      db.collection('businesses').update({
        _id: ObjectId(id)
      }, {
        $set: data
      }).then((res) => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },

    readServices: function (id, cb) {
      db.collection('businesses').find(ObjectId(id)).toArray().then((business) => {
        const services = business[0].services
        cb(null, services)
      })
    },

    updateServices: function (id, data, cb) {
      db.collection('businesses').update({
        _id: ObjectId(id)
      }, {
        $set: {"services": data}
      }).then((res) => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },

    createTransaction: function(id, data, cb) {
      db.collection('businesses').update({
        _id: ObjectId(id)
      }, {
        $push: {"transactions": {
          ...data,
          "timestamp": new Date()
        }}
      }).then((res) => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },

    getCalendarEvents: function(id, cb) {
      db.collection('businesses').find(ObjectId(id)).toArray().then((business) => {
        const calendarId = business[0].calendarId
        return gCalHelpers.getCalendarEvents(calendarId)
      }).then(res => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },
    
    createCalendarEvent: function(id, data, cb) {
      gCalHelpers.newCalendarEvent(id, data)
      cb(null, 'done')
    }
  }
}