'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var audit = new Schema({
  channelName: {
    type: String,
      required: 'Kindly enter the name of channel ',
  },
  ciserviceName: {
    type: String
  },
  requestData: {
    type: Object
    },
  responseData: {
    type: Object
  },
  userName: {
    type: String
  },
  requestDate: {
    type: Date,
    required : 'Date please '
  },
  lastUpdatedDate: {
    type: Date
    }
});





module.exports = mongoose.model('audit', audit);
//module.exports = mongoose.model('diag_registration', diag_registration);
