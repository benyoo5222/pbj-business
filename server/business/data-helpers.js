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
      console.log(`Inserting the following data into /${id}`)
      console.log(data)
      db.collection('businesses').update(
        {
          _id: ObjectId(id)
        }, {
          $set: data
        }).then((res) => {
          cb(null, res)
        }).catch(err => {
          console.error(err)
        })
    }
  }
}