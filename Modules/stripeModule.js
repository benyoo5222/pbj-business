const stripekeys = require('../server/stripe_secrets.json');
const keySecret = stripekeys.keySecret;
const stripe = require("stripe")(keySecret);

const stripePayment = (stripeToken, customerEmail, totalPrice) => (
  stripe.customers.create({
    email: customerEmail,
    source: stripeToken.id
  })
  .then(customer => {
    stripe.charges.create({
    amount: totalPrice,
    description: "Ben's Hair Salon",
    currency: "cad",
    customer: customer.id
    })
  })
)

module.exports = {
  stripePayment: stripePayment
}