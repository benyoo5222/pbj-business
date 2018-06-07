module.exports = {
  requestStripePayment: function(data) {
    const stripekeys = require('../stripe_secrets.json');
    const gmailPassword = require('../gmail_password.json')
    const keySecret = stripekeys.keySecret;
    const stripe = require("stripe")(keySecret);
    const nodemailer = require('nodemailer');
    const moment = require('moment');
    const appointmentStart = moment(data.event.start).format('LLL');
    const appointmentEnd = moment(data.event.end).format('LLL');
    console.log(data)

  let message = '';
  if (data.stripeData.token){
    message = "Thank you for payment. See you then!"
  } else {
    message = "See you then!"
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'benyoo5222@gmail.com',
      pass: gmailPassword.password
    }
  });

  const mailOptions = {
    from: 'benyoo5222@gmail.com',
    to: data.customer.email,
    subject: 'Your appointment details for Ben\'s Hair Salon',
    text:
      ` Hi ${data.customer.name}! Thanks for booking an appointment with us.

  This is a summary of your appointment.

  Location: 46 Spadina Ave.

  When: ${appointmentStart} to ${appointmentEnd}.

  The services you have chosen are ${data.services.map(value => value)}.

  The total price is $${data.totalPrice/100}.

  ${message}`
  }



  stripe.customers.create({
    email: data.customer.email,
    source: data.stripeData.token.id
  })
  .then(customer => {
      stripe.charges.create({
      amount: data.totalPrice,
      description: "Ben's Hair Salon",
      currency: "cad",
      customer: customer.id
    })
  })
  .then(charge => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
    return true
  }
}