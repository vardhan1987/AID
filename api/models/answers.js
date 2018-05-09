'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answers = new Schema({
  channelName: {
    type: String,
      required: 'Kindly enter the name of channel ',
  },
  ciservice: {
    type: String
  },
  query: {
    type: String
    },
  answerByCi: {
    type: String
  },
  userName: {
    type: String
  },
  requestDate: {
    type: Date,
    required : 'Date please '
  },
  status: {
    type: String
    }
});





module.exports = mongoose.model('answers', answers);
//module.exports = mongoose.model('diag_registration', diag_registration);
