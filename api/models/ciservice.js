'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ciservice = new Schema({
  name: {
    type: String,
      required: 'Kindly enter the name ',
  },
  accessKey: {
    type: String,
      required: 'Kindly enter the value to be blacklisted',
  },
  enabled: {
      type: Number,
        required: 'Kindly enter the enabled flag',
        default : 1
    },
  secretKey: {
    type: String,
      required: 'Kindly enter the value to be blacklisted',
  },
  responseCount:{
  type: Number,
  default:0,
    required: 'Kindly enter the value to be blacklisted',
},
requestCount: {
  type: Number,
  default:0,
    required: 'Kindly enter the value to be blacklisted',
}
});





module.exports = mongoose.model('ciservice', ciservice);
//module.exports = mongoose.model('diag_registration', diag_registration);
