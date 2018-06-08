const gmailPassword = require('../gmail_password.json');
const nodemailer = require('nodemailer');

const sendEmail = (customerEmail, bodyMessage) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pbjscheduler@gmail.com',
      pass: gmailPassword.password
    }
  });

  const mailOptions = {
    from: 'benyoo5222@gmail.com',
    to: customerEmail,
    subject: 'Your appointment details for Ben\'s Hair Salon',
    text: bodyMessage
  }


  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log(`Email sent: ${info.response}`);
    }
  })
}

module.exports = {
  sendEmail: sendEmail
}