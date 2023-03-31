const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.mongodb.connnectionString, config.mongodb.options);

mongoose.connection.on('error', (error) => {
  console.log('mongodb connection error', error);
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongoodb');
});
module.exports = mongoose;
