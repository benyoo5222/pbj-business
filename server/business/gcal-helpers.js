const { google } = require('googleapis')
const SERVICE_ACCOUNT = require('../service_account_secrets.json')

// Generate JWT auth client. Very little documentation on this. Do not promisify `.authorize()`
// http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
const oauth2Client = new google.auth.OAuth2()
const jwtClient = new google.auth.JWT(
  SERVICE_ACCOUNT.client_email,
  null,
  SERVICE_ACCOUNT.private_key,
  ['https://www.googleapis.com/auth/calendar']
).authorize((err, tokens) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('Successfully authorized Google service account')
    oauth2Client.setCredentials(tokens)
  }
})

const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client
})

module.exports = {
  getCalendarEvents: function(calendarId) {
    return calendar.events.list({
      calendarId: calendarId
    }).then(res => {
      return res.data.items
    })
  },
  
  insertCalendarEvent: function (calendarId, event) {

    return calendar.events.insert({
      calendarId: calendarId,
      resource: event
    }).then(res => {
      return res.data
    })
  }
}
