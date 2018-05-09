'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registration = new Schema({
  channel_id: {
    type: String,
      required: 'Kindly enter the channel',
  },
    access_token: {
    type: String,
    required: 'Kindly enter the access token number',
    unique : true
  },
  access_key: {
    type: String,
    required: 'Kindly enter the access key number',
    unique : true
  },
  private_key: {
    type: String,
      required: 'Kindly enter the private key',
  },
  bot: {
    type: String,
      required: 'Kindly enter the bot name',
  }
});





module.exports = mongoose.model('registration', registration);
//module.exports = mongoose.model('diag_registration', diag_registration);
