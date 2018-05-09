'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
Task2 = mongoose.model('channel');


exports.regchannel = function(req, res) {
  console.log(req.body);
  var val = req.body.input;

  var new_task = new Task2(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });


};


exports.listchannel = function(req, res) {
  Task2.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};



exports.stats = function(req, res) {
  Task2.find({name : req.params.channelName}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};


exports.updatechannel = function(req, res) {
  Task2.update({_id:req.params.id}, {$set: req.body},  function(err,task){
    if (err)
      res.send(err);
    res.json(task);
  });

};
