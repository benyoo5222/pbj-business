"use strict";

module.exports = function makeDataHelpers(db) {
  return {
    createBusiness: function (data, cb) {
      db.collection('businesses').insertOne(data).then(() => {
        cb(null, true)
      })
    },

    readBusiness: function (data, cb) {
      db.collection('businesses').find().toArray().then((business) => {
        cb(null, business)
      })
    },

    readAllBusinesses: function (cb) {
      db.collection('businesses').find().toArray().then((data) => {
        cb(null, data)
      })
    }
  }
}