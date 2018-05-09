'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channel = new Schema({
  name: {
    type: String,
      required: 'Kindly enter the name of channel ',
  },
  webhookApi: {
    type: String,
      required: 'Kindly enter the url of webhook api',
  },
  verificationToken: {
    type: String,
      required: 'Kindly enter the verification token',
  },
  enabled: {
    type: Number,
      required: 'Kindly enter the enabled flag',
      default : 1
  },
  reqCount: {
    type: Number,
      default : 0
  },
  successCount: {
    type: Number,
    default : 0
  },
  failCount: {
    type: Number,
    default : 0
        }

});





module.exports = mongoose.model('channel', channel);
//module.exports = mongoose.model('diag_registration', diag_registration);
