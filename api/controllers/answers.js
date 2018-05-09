'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
Task5 = mongoose.model('answers');




exports.listallanswers = function(req, res) {
  Task5.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};


exports.listunanswered = function(req, res) {
  Task5.find({status : req.params.status }, function(err, task) {
    if (err){
      res.send(err);
    }else {
    task.totalcount = task.length;
    console.log(task);
    res.json(task);
    }

  });

};
