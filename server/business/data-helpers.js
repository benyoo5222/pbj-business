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
        const serviceList = data.services.map(billingCode => {
          return business.services.find(service => {
            return service.billingCode == billingCode
          }).description
        }).join(', ')

        const event = {
          summary: `${data.customer.name} -- ${serviceList}`,
          start: { dateTime: data.event.start },
          end: { dateTime: data.event.end },
          description: `${data.customer.phone || 'No phone number'}`,
          attendees: data.customer.email ? [{
            'email': data.customer.email
          }] : null,
          location: business.address || '',
          extendedProperties: {
            private: {
              customerName: data.customer.name,
              customerEmail: data.customer.email,
              customerPhone: data.customer.phone,
              paymentMethod: data.stripeData.token ? 'stripe' : 'cash',
              totalPrice: data.totalPrice,
              serviceList: serviceList
            }
          }
        }
        return calendarHelpers.insertCalendarEvent(business.calendarId, event)
        // return true
      }).then(res => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },
    //-------------stuff Jeff did----------------------
    updateHours: function (id, data, cb) {
      db.collection('businesses').update({
        _id: ObjectId(id)
      }, {
        $set: {"hours": data}
      }).then((res) => {
        cb(null, res)
      }).catch(err => {
        console.error(err)
      })
    },
  }
}