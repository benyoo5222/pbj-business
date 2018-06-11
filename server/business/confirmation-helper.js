module.exports = {
  typeOfConfirmation: function(data) {
    const NodeMailer = require('../Modules/nodeMailerModule.js');
    const orderDetails = require('../Modules/orderDetailModule.js');
    const twilio = require('../Modules/twilioModule.js');
    const customerMessage = orderDetails.orderDetailCustomer(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)
    const businessMessage = orderDetails.orderDetailBusiness(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)

    twilio.sendText(businessMessage, '2267008540');

    if (data.typeOfConfirmation.text && data.typeOfConfirmation.email) {
        twilio.sendText(customerMessage, data.customer.phone);
        NodeMailer.sendEmail(data.customer.email, customerMessage);
    } else if (data.typeOfConfirmation.email){
        NodeMailer.sendEmail(data.customer.email, customerMessage)
    } else if (data.typeOfConfirmation.text){
        twilio.sendText(customerMessage, data.customer.phone);
    }

  }
}