'use strict';
var express = require('express');
var twit = require('twit');
var request = require('request');


var http = require('http'),
 https = require('https'),
 aws4 = require('aws4');
var rp = require('request-promise');

var crypto = require('crypto'),
 key = 'jenson';


var mongoose = require('mongoose'),
 blacklistcheck = mongoose.model('blacklist'),
 audit = mongoose.model('audit'),
 ciservice = mongoose.model('ciservice'),
 channel = mongoose.model('channel'),
 answers = mongoose.model('answers');


var randomItem = require('random-item');

var request = require('request');

var clientAccessToken = process.env.clientAccessToken;

var bot = new twit({
 consumer_key: process.env.TWITTER_CONSUMER_KEY,
 consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 access_token: process.env.TWITTER_ACCESS_TOKEN,
 access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var params = {};
var count = 0;
params = {
 screen_name: 'jensonjms',
 text: `Hello World!!! ${count++}`

};

var stream = bot.stream('user');



stream.on('direct_message', function(eventMsg, res) {
 console.log("EVENT MESSAGE >>", eventMsg);
 console.log("eventMsg.direct_message.sender.screen_name", eventMsg.direct_message.sender.screen_name);
 console.log("eventMsg.direct_message.sender.name", eventMsg.direct_message.sender.name);

 //params.screen_name = eventMsg.direct_message.sender.screen_name;
 eventMsg.messager = {
  screen_name: eventMsg.direct_message.sender.screen_name
 };
 eventMsg.messager.name = eventMsg.direct_message.sender.name;
 console.log("eventMsg.body.screen_name>>>", eventMsg.messager.screen_name);
 console.log("eventMsg.messager>>>", eventMsg.messager);

 console.log("Req_params>>", params);
 if (eventMsg.direct_message.sender.screen_name === "EvolvusBank") {
  console.log("should not call post method as msg coming from ", eventMsg.direct_message.sender.screen_name);
 } else {
  registerrequest(eventMsg, res);
 }
});

var postMessage = function(pm) {
 console.log("postMessage start >>>>", pm);
 bot.post('direct_messages/new', pm, function(error, message, response) {
  if (error) {
   console.log(error);
   return (error);
  } else {
   console.log("inside postMessage else block");
   console.log(message);
   channel.update({
    name: "twitter"
   }, {
    $inc: {
     successCount: 1
    }
   }, {
    upsert: true
   }, function(err) {
    if (err) {
     console.log('Could not update channel success count' + err);
    }
   });
   return (response);
  }
 });
};

exports.handlerequest = function(req, res) {
 console.log("inside handlerequest");
 registerrequest(req, res);
};
exports.handlegetrequest = function(req, res) {
 console.log("inside handlegetrequest");
};

function registerrequest(req, res) {
 console.log("Inside registerrequest");
 console.log("Req", req);
 console.log("Req_body_stringyfy", JSON.stringify(req));
 //var token = req.body.verify_token;
 var token = "5ac60b6a0499fd0b76a2ecb6"
 console.log(token);
 req.body = {
  channel: 'twitter'
 };
 console.log(req.body.channel);

 channel.find({
  verificationToken: token
 }, function(err, ctask) {
  if (err) {
   res.send(err);
  } else {
   console.log('checking token');
   if (ctask.length === 0) {
    //res.json({message :'The channel is not registered Please contact to bank.'});
    var message = 'The channel is not registered Please contact to bank.'
    console.log("message :", message);
    params.text = message;
    console.log(params);
    postMessage(params);
   } else if (ctask[0].enabled === 0) {
    var message = 'The ' + ctask[0].name + ' channel is not enabled. Please contact to bank.'
    console.log("message :", message);
    params.text = message;
    console.log(params);
    postMessage(params);
   } else {
    console.log('is verified');

    if (ctask[0].enabled === 1) {
     console.log('is enabled ' + ctask[0].enabled);
     req.body.channel = ctask[0];
     var count = req.body.channel.reqCount + 1;
     channel.update({
      name: req.body.channel.name
     }, {
      $set: {
       reqCount: count
      }
     }, {
      upsert: true
     }, function(err, task) {
      if (err) {
       console.log('Could not update channel req count' + err);
      } else {
       console.log('req count incremented  ' + task);
       var auditdata = {
        channelName: req.body.channel.name,
        requestDate: new Date()
       };
       var auditinfo = new audit(auditdata);
       auditinfo.save(function(err, task) {
        if (err) {
         console.log('Audit information could not be saved' + err);

         var message = 'Audit information could not be saved. Not forwarding to CI Service'
         console.log("message :", message);
         params.text = message;
         console.log(params);
         postMessage(params);

        } else {
         console.log(task);
         req.body.auditid = task._id;
         console.log(req.body.auditid);
         handlelexrequest(req, res);
        }
       });
      }
     });
    } else {
     //res.json({message :'The '+ctask[0].name+' channel is not enabled. Please enable at Diana Server.'});
     var message = 'The ' + ctask[0].name + ' channel is not enabled. Please enable at Diana Server.'
     console.log("message :", message);
     params.text = message;
     console.log(params);
     postMessage(params);
    }
   }
  };
 });
};

function handlelexrequest(req, res) {
 req.body.ciservicename = "GoogleDialogFlow";
 var val = req.direct_message.text;
 var channelid = req.body.channel.name;
 console.log("val>>", val);
 console.log("channelid>>", channelid);

 var inputarray = val.split(' ');
 console.log(inputarray);
 blacklistcheck.find({}, function(err, task) {
   console.log("In for blacklist");
  if (err) {
   res.send(err);
  } else {
    console.log("In for blacklist else block");
   for (let word in inputarray) {
    for (var i = 0; i < task.length; i++) {
     var checkval = new RegExp(task[i].pattern.toString());
     if (checkval.test(inputarray[word])) {
      inputarray[word] = crypto.createHmac('md5', key).update(inputarray[word]).digest('hex');
      console.log(inputarray[word]);
     }
    };
   };
   val = inputarray.join(" ");
   console.log('in');
   var bodytext = '{"inputText" : "' + val + '" , "requestAttributes":{"auditid" : "' + req.body.auditid + '", "channelid" : "' + channelid + '"}}';
   console.log(bodytext);
   req.body.nameofuser = req.messager.name;
   ciservice.find({
    name: "GoogleDialogFlow"
   }, function(err, task) {
    //ciservice.find({name : "Lex"}, function(err, task) {
    if (err) {
     res.send(err);
    } else {


     console.log("req.body>>>", req.body);
     console.log(req.messager.screen_name);
     params.screen_name = req.messager.screen_name;
     var username = req.messager.name;
     var screen_name = req.messager.screen_name;
     console.log("username>>>>", username);
     console.log("req.direct_message.text>>>", req.direct_message.text);
     var inputext = req.direct_message.text
     console.log("inputext", inputext);
     // Set the headers
     var headers = {
      'Authorization': 'Bearer ' + clientAccessToken,
      'Content-Type': 'application/json'
     }


     // Configure the request//https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=hi&sessionId=12345
     var options = {
      url: `https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=${inputext}&sessionId=12345&contexts=${req.body.auditid},${username},${screen_name}`,
      headers: headers
     }

     // Start the request
     request.get(options, function(error, response, body) {
      console.log("options>>>", options);
      if (!error && response.statusCode == 200) {
       // Print out the response body
       console.log("body>>", body);
       var body1 = JSON.parse(body);
       console.log("JSON_parse_body", JSON.parse(body));
       //console.log("response>>",response);
       console.log("response_body", body1);
       console.log("response_result>>>", body1.result);
       console.log("response_fulfilment>>>", body1.result.fulfillment);
       //console.log("response_displayText>>>",body1.result.fulfillment.displayText);
       console.log("response_displayText>>>", body1.result.fulfillment.speech);

       console.log();
       params.text = body1.result.fulfillment.speech;
       console.log("should call post method");
       console.log("Sent Response params >>", params);
       console.log("Output Context");
       // registerrequest(body,response);
       postMessage(params);

       var options1 = {
        url: `https://api.dialogflow.com/v1/contexts/?sessionId=12345`,
        headers: headers,
       }
       request.delete(options1, function(error, response, body) {
        console.log("options1>>>", options1);
        if (!error && response.statusCode == 200) {
         console.log("body1>>", body);
         //  console.log("response1>>",response);
        } else {
         console.log("error>>", error);
        }
       });
       ////
       console.log("body1.metadata.intentName>>>",body1.result.metadata.intentName);
       console.log("inputext>>>",inputext);
        if (body1.result.metadata.intentName ==="Default Fallback Intent") {
          console.log("Inside to update the answer0");
          console.log(typeof(options));
          var optionsstring = JSON.stringify(options, null, 4);
          var answersdata = {
           channelName: "twitter",
           ciservice: "GoogleDialogFlow",
           query: inputext,
           answerByCi: body1.result.fulfillment.speech,
           userName: username,
           requestDate: new Date(),
           status: 0
          };
          //console.log(answersdata);

          var answerinfo = new answers(answersdata);
          answerinfo.save(function(err, task) {
           if (err) {
            console.log('Could not save answers' + err);
           } else {
            console.log('Answers0 saved');
           };
          });

        } else {
       console.log("Inside to update the answer1");
       console.log(typeof(options));
       var optionsstring = JSON.stringify(options, null, 4);
       var answersdata = {
        channelName: "twitter",
        ciservice: "GoogleDialogFlow",
        query: inputext,
        answerByCi: body1.result.fulfillment.speech,
        userName: username,
        requestDate: new Date(),
        status: 1
       };
       //console.log(answersdata);

       var answerinfo = new answers(answersdata);
       answerinfo.save(function(err, task) {
        if (err) {
         console.log('Could not save answers' + err);
        } else {
         console.log('Answers1 saved');
        };
       });

     }}  else {
       console.log("error>>", error);
       channel.update({
        name: "twitter"
       }, {
        $inc: {
         failCount: 1
        }
       }, {
        upsert: true
       }, function(err) {
        if (err) {
         console.log('Could not update channel fail count' + err);
        }
       })
       var message = 'Something Went wrong Please try again!!'
       console.log("message :", message);
       params.text = message;
       console.log(params);

       console.log("Inside to update the answer2");
       console.log(typeof(options));
       var optionsstring = JSON.stringify(options, null, 4);


       var answersdata = {
        channelName: "twitter",
        ciservice: "GoogleDialogFlow",
        query: optionsstring,
        answerByCi: message,
        userName: username,
        requestDate: new Date(),
        status: 2
       };
       var answerinfo = new answers(answersdata);
       answerinfo.save(function(err, task) {
        if (err) {
         console.log('Could not save answers' + err);
        } else {
         console.log('Answers2 saved');
        };
       });
       postMessage(params);
      }
     })
     console.log("Opts after sign");
     console.log("params>>>", params);

    };
   });
  }
 });
}
