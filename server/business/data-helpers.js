"use strict";
const ObjectId = require('mongodb').ObjectId

module.exports = function makeDataHelpers(db) {
  return {
    createBusiness: function (data, cb) {
      db.collection('businesses').insertOne(data).then(() => {
        cb(null, true)
      })
    },

    readBusiness: function (data, cb) {
      console.log(data)
      db.collection('businesses').find({_id: ObjectId(data)}).toArray().then((business) => {
        cb(null, business)
      })
    },

    readAllBusinesses: function (cb) {
      db.collection('businesses').find({}).toArray().then((data) => {
        cb(null, data)
      })
    }
  }
}