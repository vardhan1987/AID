'use strict';

var Regex = require("regex");
var mongoose = require('mongoose'),
  //Task = mongoose.model('Tasks');
Task = mongoose.model('registration');
//Task1 = mongoose.model();


exports.list_all_regs_lex = function(req, res) {
  Task.find({bot : "lex"}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.register_a_channel_lex = function(req, res) {
  req.body.bot = "lex"
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.list_all_regs_diag = function(req, res) {
  Task.find({bot : "diag"}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.register_a_channel_diag = function(req, res) {
  req.body.bot = "diag"
  console.log(req.body);
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
