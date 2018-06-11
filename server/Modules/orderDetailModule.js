const moment = require('moment-timezone');

const orderDetailCustomer = (startDate, endDate, stripeToken, customerName, services, totalPrice) => {
  const appointmentStart = moment(startDate).tz("America/Toronto").calendar()
  const appointmentEnd = moment(endDate).tz("America/Toronto").format('LT');

  let message = "See you then!";
    if (stripeToken){
      message = "Thank you for payment. See you then!"
    }

  const bodyMessage = `Hi ${customerName}! Thanks for booking an appointment with us. Here are the appointment details:

Location: Ben's Hair Salon, 46 Spadina Ave.

When: ${appointmentStart} to ${appointmentEnd}.

Services: ${services.map(value => value.description).join(', ')}.

Total price: $${(1.13*totalPrice/100.0).toFixed(2)}.

${message}`

  return bodyMessage;
}

const orderDetailBusiness = (startDate, endDate, stripeToken, customerName, services, totalPrice) => {
  const appointmentStart = moment(startDate).tz("America/Toronto").calendar()
  const appointmentEnd = moment(endDate).tz("America/Toronto").format('LT');

  let message = "payment is due.";
    if (stripeToken){
      message = "payment received with Stripe."
    }

  const bodyMessage = `New appointment for ${customerName}:

When: ${appointmentStart} to ${appointmentEnd}.

Services: ${services.map(value => value.description).join(', ')}.

Total price: $${(1.13*totalPrice/100.0).toFixed(2)}, ${message}`

  return bodyMessage;
}


module.exports = {
  orderDetailCustomer,
  orderDetailBusiness
}