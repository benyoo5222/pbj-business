"use strict";
const ObjectId = require('mongodb').ObjectId
// const gCalHelpers = require('./gcal-helpers.js')

module.exports = function makeDataHelpers(db, calendarHelpers) {
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
        return calendarHelpers.getCalendarEvents(calendarId)
      }).then(res => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },
    
    createCalendarEvent: function(id, data, cb) {
      db.collection('businesses').find(ObjectId(id)).toArray().then((businesses) => {
        // Retrives the only (ie. first) 'business' object matched by db.find(id)
        const business = businesses[0]

        // Construct the event name from the services requested (by billing code)
        const summary = data.services.map(billingCode => {
          return business.services.find(service => {
            return service.billingCode == billingCode
          }).description
        }).join(', ')

        const event = {
          summary: summary,
          start: { dateTime: data.event.start },
          end: { dateTime: data.event.end },
          description: `${summary} for ${data.customer.name} (${data.customer.phone || 'No phone number'})`,
          // attendees: [{
          //   'email': data.customer.email || ''
          // }],
          location: business.address || ''
        }

        // return calendarHelpers.insertCalendarEvent(business.calendarId, event)
        return true
      }).then(res => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}