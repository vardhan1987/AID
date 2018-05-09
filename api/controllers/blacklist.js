'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
Task1 = mongoose.model('blacklist');


exports.blacklist = function(req, res) {
  console.log(req.body);
  var val = req.body.input;

  var new_task = new Task1(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });


};


exports.listblacklist = function(req, res) {
  Task1.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};
