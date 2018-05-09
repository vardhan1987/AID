'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
Task3 = mongoose.model('ciservice');


exports.regciservice = function(req, res) {
  console.log(req.body);
  var val = req.body.input;

  var new_task = new Task3(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });


};


exports.listciservice = function(req, res) {
  Task3.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};

exports.stats = function(req, res) {
  Task3.find({name : ciserviceName}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};

exports.updateciservice = function(req, res) {
  Task3.update({_id:req.params.id}, {$set: req.body},  function(err,task){
    if (err)
      res.send(err);
    res.json(task);
  });

};
