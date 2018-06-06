module.exports = {
  requestStripePayment: function(data) {
    const stripekeys = require('./stripekeys.json');
    const keySecret = stripekeys.keySecret;
    const stripe = require("stripe")(keySecret);


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
    console.log(charge)
  })
    return true
  }
}