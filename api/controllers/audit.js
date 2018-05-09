'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
Task4 = mongoose.model('audit');




exports.listaudits = function(req, res) {
  Task4.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};
