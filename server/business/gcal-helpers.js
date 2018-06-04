// Module returns functions which are closured-in (?) with the calendar and JWT client
module.exports = function(calendar, jwtClient) {
  return {
    getCalendarEvents: function(calendarId) {
      return calendar.events.list({
        auth: jwtClient,
        calendarId: calendarId
      }).then(res => {
        return res.data.items
      })
    },
    
    newCalendarEvent: function (id, data) {

      console.log(SERVICE_ACCOUNT)
    }
  }
}