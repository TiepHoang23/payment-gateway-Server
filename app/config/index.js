const mongodb = require('./mongodb');
const jwt = require('./jwt');
const paypal = require('./paypal');

module.exports = {
  ...mongodb,
  ...jwt,
  ...paypal,
};
