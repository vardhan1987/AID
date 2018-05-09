'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blacklist = new Schema({
  name: {
    type: String,
      required: 'Kindly enter the name ',
  },
  pattern: {
    type: String,
      required: 'Kindly enter the value to be blacklisted',
  }
});





module.exports = mongoose.model('blacklist', blacklist);
//module.exports = mongoose.model('diag_registration', diag_registration);
