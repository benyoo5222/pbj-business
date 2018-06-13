module.exports = {
  sendConfirmations: function(data) {
    const NodeMailer = require('../Modules/nodeMailerModule.js');
    const orderDetails = require('../Modules/orderDetailModule.js');
    const twilio = require('../Modules/twilioModule.js');
    const customerMessage = orderDetails.orderDetailCustomer(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)
    const businessMessage = orderDetails.orderDetailBusiness(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)

    // Send message to business owner (should check against business notification prefs)
    twilio.sendText(businessMessage, '2267008540');

    if (data.typeOfConfirmation.email){
        NodeMailer.sendEmail(data.customer.email, customerMessage)
        console.log('Sent email confirmation')
    }
    if (data.typeOfConfirmation.text){
        twilio.sendText(customerMessage, data.customer.phone);
        console.log('Sent text confirmation')
    }

  }
}