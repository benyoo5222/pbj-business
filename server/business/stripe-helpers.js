module.exports = {
  requestStripePayment: function(data) {
    const stripePayment = require('../Modules/stripeModule.js')

    return stripePayment.stripePayment(data.stripeData.token,data.customer.email, data.totalPrice)
      .then(() => {
        console.log('Successfully processed stripe payment')
      }).catch((err) => {
        console.error('Error processing stripe payment', err)
      })
  }
}