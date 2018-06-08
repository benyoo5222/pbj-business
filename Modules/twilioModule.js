const twilioKeys = require('../server/twilio_secrets.json');
const accountSid = twilioKeys.accountSid;
const authToken = twilioKeys.authToken;
const client = require('twilio')(accountSid, authToken);

const sendText = (bodyMessage, customerNumber) => (
  client.messages.create({
    body: bodyMessage,
    from: '+12267991623',
    to: `+1${customerNumber}`
  })
  .then(message => console.log(message.sid))
  .done()
)

module.exports = {
  sendText: sendText
}