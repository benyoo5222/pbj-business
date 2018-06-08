const moment = require('moment');

const orderDetail = (startDate, endDate, stripeToken, customerName, services, totalPrice) => {
  const appointmentStart = moment(startDate).format('LLL');
  const appointmentEnd = moment(endDate).format('LLL');

  let message = "See you then!";
    if (stripeToken.id){
      message = "Thank you for payment. See you then!"
    }

  const bodyMessage = ` Hi ${customerName}! Thanks for booking an appointment with us.

    This is a summary of your appointment.

    Location: 46 Spadina Ave.

    When: ${appointmentStart} to ${appointmentEnd}.

    The services you have chosen are ${services.map(value => value)}.

    The total price is $${totalPrice/100}.

    ${message}`

  return bodyMessage;
}

module.exports = {
  orderDetail: orderDetail
}