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
    const twilioKeys = require('../twilio_secrets.json');
    const accountSid = twilioKeys.accountSid;
    const authToken = twilioKeys.authToken;
    const client = require('twilio')(accountSid, authToken);
    console.log(data)

    let message = "See you then!";
    if (data.stripeData.token){
      message = "Thank you for payment. See you then!"
    }

    const bodyMessage = ` Hi ${data.customer.name}! Thanks for booking an appointment with us.

    This is a summary of your appointment.

    Location: 46 Spadina Ave.

    When: ${appointmentStart} to ${appointmentEnd}.

    The services you have chosen are ${data.services.map(value => value)}.

    The total price is $${data.totalPrice/100}.

    ${message}`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pbjscheduler@gmail.com',
        pass: gmailPassword.password
      }
    });

    const mailOptions = {
      from: 'benyoo5222@gmail.com',
      to: data.customer.email,
      subject: 'Your appointment details for Ben\'s Hair Salon',
      text: `${bodyMessage}`
    }


    if (data.stripeData.token.id) {
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

        client.messages.create({
         body: bodyMessage,
         from: '+12267991623',
         to: `+1${data.customer.phone}`
         })
         .then(message => console.log(message.sid))
         .done();
        })
    } else {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      client.messages.create({
          body: bodyMessage,
          from: '+12267991623',
          to: `+1${data.customer.phone}`
         })
         .then(message => console.log(message.sid))
         .done();
    }


      return true
    }
}