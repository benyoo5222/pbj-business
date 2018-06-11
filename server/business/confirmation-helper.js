module.exports = {
  typeOfConfirmation: function(data) {
    const NodeMailer = require('../Modules/nodeMailerModule.js');
    const orderDetails = require('../Modules/orderDetailModule.js');
    const twilio = require('../Modules/twilioModule.js');
    const bodyMessage = orderDetails.orderDetail(data.event.start, data.event.end, data.stripeData.token, data.customer.name, data.services, data.totalPrice)


    if (data.typeOfConfirmation.text && data.typeOfConfirmation.email) {
        twilio.sendText(bodyMessage, data.customer.phone);
        NodeMailer.sendEmail(data.customer.email, bodyMessage);
    } else if (data.typeOfConfirmation.email){
        NodeMailer.sendEmail(data.customer.email, bodyMessage)
    } else if (data.typeOfConfirmation.text){
        twilio.sendText(bodyMessage, data.customer.phone);
    }

  }
}