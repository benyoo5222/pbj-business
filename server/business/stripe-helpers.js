module.exports = {
  requestStripePayment: function(data) {
    const stripePayment = require('../../Modules/stripeModule.js')
    const NodeMailer = require('../../Modules/nodeMailerModule.js');
    const orderDetails = require('../../Modules/orderDetailModule.js');
    const twilio = require('../../Modules/twilioModule.js');
    const bodyMessage = orderDetails.orderDetail(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)

    if (data.stripeData.token.id) {
      stripePayment.stripePayment(data.stripeData.token,data.customer.email, data.totalPrice)
      .then(charge => {
        if (data.typeOfPayment.text) {
          twilio.sendText(bodyMessage, data.customer.phone)
        } else {
          NodeMailer.sendEmail(data.customer.email, bodyMessage)
        }
      })
    } else {
      if (data.typeOfPayment.text) {
        twilio.sendText(bodyMessage, data.customer.phone)
      } else {
        NodeMailer.sendEmail(data.customer.email, bodyMessage)
      }
    }
      return true
  }
}