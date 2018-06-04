// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// const passport = require('passport')
// const gcal = require('google-calendar')

// http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
const { google } = require('googleapis')
const SERVICE_ACCOUNT = require('../service_account_secrets.json')
const CALENDAR_ID = require('../calendar_secrets.json').CALENDAR_ID

const jwtClient = new google.auth.JWT(
  SERVICE_ACCOUNT.client_email,
  null,
  SERVICE_ACCOUNT.private_key,
  ['https://www.googleapis.com/auth/calendar']
)

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('Successfully connected')
  }
})
const calendar = google.calendar('v3')
// calendar.events.list({
//   auth: jwtClient,
//   calendarId: CALENDAR_ID
// }, (err, res) => {
//   if (err) {
//     console.log('The API returned an error: ' + err)
//     return
//   }
//   const events = res.data.items
//   console.log(events)
  
// })

module.exports = {
  getCalendarEvents: function(id) {
    return calendar.events.list({
      auth: jwtClient,
      calendarId: CALENDAR_ID
    }).then(res => {
      return res.data.items
    })
  },
  
  newCalendarEvent: function (id, data) {

    console.log(SERVICE_ACCOUNT)
  }
}